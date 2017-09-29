import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Grocery } from './grocery.model';
import { GroceryService } from './grocery.service';

@Injectable()
export class GroceriesCommonViewModel {
  isShowingRecent: boolean = false;

  isReady: boolean = false;

  constructor(public store: GroceryService) {
    this.init();
  }

  private init() {
    this.isReady = true;
  }

  get items(): BehaviorSubject<Array<Grocery>> {
    return this.store.items;
  }

  add(groceryName: string, successHandler: any, errorHandler: any) {
    this.store.add(new Grocery(null, groceryName))
      .subscribe(
      (data) => { if (successHandler) { successHandler(data); } },
      () => { if (errorHandler) { errorHandler(); } }
      );
  }

  toggleRecent(successHandler: any, errorHandler: any) {
    if (this.isShowingRecent) {
      let indeces: string[] = this.store.itemsToRestore();

      if (indeces && indeces.length > 0) {
        this.store.restore(indeces)
          .subscribe(
          () => { if (successHandler) { successHandler(); } },
          () => { if (errorHandler) { errorHandler(); } }
          );
      } else {
        if (successHandler) { successHandler(); }
      }

    } else if (successHandler) {
      successHandler();
    }
  }

}
