import { Component, OnInit } from '@angular/core';

import { GroceriesCommonViewModel } from '../../x-shared/app/groceries';

import { GroceryListComponent } from './grocery-list';

@Component({
  selector: 'groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss'],
  providers: [GroceriesCommonViewModel]
})
export class GroceriesComponent implements OnInit {
  grocery: string = '';

  isLoading: boolean = false;

  constructor(
    public cvm: GroceriesCommonViewModel) { }

  ngOnInit() {
    this.showActivityIndicator();
  }

  showActivityIndicator() {
    this.isLoading = true;
  }

  hideActivityIndicator() {
    this.isLoading = false;
  }

  add() {
    if (this.grocery.trim() === '') {
      alert('Enter a grocery item');
      return;
    }

    this.cvm.add(this.grocery, 
      () => {
        this.grocery = '';
      }, () => {
        alert('An error occurred while adding a grocery to your list.');
      });
  }

  toggleRecent() {
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
}
