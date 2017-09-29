import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { action } from 'ui/dialogs';
import { Color } from 'color';
import { Page } from 'ui/page';
import { TextField } from 'ui/text-field';
import * as SocialShare from 'nativescript-social-share';

import { GroceriesCommonViewModel } from '../../x-shared/app/groceries';
import { LoginService } from '../../x-shared/app/login';
import { alert } from '../shared';

import { GroceryListComponent } from './grocery-list/grocery-list.component';

@Component({
  selector: 'gr-groceries',
  moduleId: module.id,
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries-common.css', './groceries.component.css'],
  providers: [GroceriesCommonViewModel, LoginService]
})
export class GroceriesComponent implements OnInit {
  isAndroid;

  grocery: string = '';

  isLoading: boolean = false;

  @ViewChild('groceryTextField') groceryTextField: ElementRef;

  constructor(public cvm: GroceriesCommonViewModel,
    private _router: Router,
    private _loginService: LoginService,
    private _page: Page) { }

  ngOnInit() {
    this.showActivityIndicator();
    this.isAndroid = !!this._page.android;
    this._page.actionBarHidden = true;
    this._page.className = 'list-page';
  }

  // Prevent the first textfield from receiving focus on Android
  // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
  handleAndroidFocus(textField, container) {
    if (container.android) {
      container.android.setFocusableInTouchMode(true);
      container.android.setFocusable(true);
      textField.android.clearFocus();
    }
  }

  showActivityIndicator() {
    this.isLoading = true;
  }
  hideActivityIndicator() {
    this.isLoading = false;
  }

  add(target: string) {
    // If showing recent groceries the add button should do nothing.
    if (this.cvm.isShowingRecent) {
      return;
    }

    let textField = <TextField>this.groceryTextField.nativeElement;

    if (this.grocery.trim() === '') {
      // If the user clicked the add button, and the textfield is empty,
      // focus the text field and return.
      if (target === 'button') {
        textField.focus();
      } else {
        // If the user clicked return with an empty text field show an error.
        alert('Enter a grocery item');
      }
      return;
    }

    // Dismiss the keyboard
    // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
    // user can continue to add more groceries?
    textField.dismissSoftInput();

    this.showActivityIndicator();
    this.cvm.add(this.grocery,
      () => {
        this.grocery = '';
        this.hideActivityIndicator();
      },
      () => {
        alert('An error occurred while adding an item to your list.');
        this.hideActivityIndicator();
      }
      );
  }

  toggleRecent() {
    if (!this.cvm.isShowingRecent) {
      this.cvm.isShowingRecent = true;
      return;
    }

    this.showActivityIndicator();
    this.cvm.toggleRecent(
      () => {
        this.cvm.isShowingRecent = !this.cvm.isShowingRecent;
        this.hideActivityIndicator();
      },
      () => {
        alert('An error occurred while adding groceries to your list.');
        this.hideActivityIndicator();
      }
      );
  }

  showMenu() {
    action({
      message: 'What would you like to do?',
      actions: ['Share', 'Log Off'],
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result === 'Share') {
        this.share();
      } else if (result === 'Log Off') {
        this.logoff();
      }
    });
  }

  share() {
    let items = this.cvm.items.value;
    let list = [];
    for (let i = 0, size = items.length; i < size; i++) {
      list.push(items[i].name);
    }
    SocialShare.shareText(list.join(', ').trim());
  }

  logoff() {
    this._loginService.logoff();
    this._router.navigate(['/login']);
  }
}
