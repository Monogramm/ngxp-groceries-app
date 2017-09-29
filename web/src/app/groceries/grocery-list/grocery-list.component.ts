import { ChangeDetectorRef, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';

import { Grocery, GroceryService } from '../../../x-shared/app/groceries';

@Component({
  selector: 'grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceryListComponent {
  @Input() showDeleted: boolean;
  @Output() loaded = new EventEmitter();

  constructor(public store: GroceryService) { }

  ngOnInit() {
    this.store.load()
      .subscribe(() => this.loaded.emit('loaded'));
  }

  imageSource(grocery) {
    if (grocery.deleted) {
      return grocery.done ? './assets/selected.png' : './assets/nonselected.png'
    }
    return grocery.done ? './assets/checked.png' : './assets/unchecked.png';
  }

  toggleDone(grocery: Grocery) {
    if (grocery.deleted) {
      grocery.done = !grocery.done;
      return;
    }

    this.store.toggleDoneFlag(grocery)
      .subscribe(
      () => { },
      () => { alert('An error occurred managing your grocery list') }
      );
  }

  delete(grocery: Grocery) {
    grocery.deleting = true;

    this.store.setDeleteFlag(grocery)
      .subscribe(
      () => { },
      () => alert('An error occurred while deleting an item from your list.')
      );
  }
}
