import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { WorkerService, BackendService } from '../core';
import { Logger, Pagination } from '../shared';
import { Grocery } from './grocery.model';

@Injectable()
export class GroceryService {
  private basePath: string = 'Groceries';

  items: BehaviorSubject<Array<Grocery>> = new BehaviorSubject([]);

  private _allItems: Array<Grocery> = [];

  constructor(private backendService: BackendService,
    private worker: WorkerService) {
    if (Logger.isEnabled) {
      Logger.log('Creating a grocery service...');
    }
  }

  load(pagination?: Pagination) {
    if (Logger.isEnabled) {
      Logger.log('loading groceries...');
    }
    this._allItems.length = 0;

    return this.backendService.load(this.basePath, pagination)
      .map(res => res.json())
      .map(data => {
        data.Result.forEach((grocery) => {
          let newGrocery = new Grocery(
            grocery.Id,
            grocery.Name,
            grocery.Done || false,
            grocery.Deleted || false,
            grocery.Deleting || false
          );

          this._allItems.push(newGrocery);
        });

        this.publishUpdates();
      });
  }

  get(id: string) {
    if (Logger.isEnabled) {
      Logger.log('retrieving a grocery = ' + id);
    }

    return this.backendService
      .getById(this.basePath, id)
      .map(res => res.json());
  }

  get count(): number {
    return this._allItems.length;
  }

  add(grocery: Grocery) {
    let body = JSON.stringify({ Name: grocery.name });

    if (Logger.isEnabled) {
      Logger.log('adding a grocery = ' + body);
    }

    return this.backendService.add(
      this.basePath, body
    )
      .map(res => res.json())
      .map(data => {
        this._allItems.unshift(new Grocery(data.Result.Id, grocery.name, false, false, false));
        this.publishUpdates();
      });
  }

  update(grocery: Grocery) {
    if (Logger.isEnabled) {
      Logger.log('updating a grocery = ' + grocery);
    }

    return this.backendService.update(
      this.basePath, grocery.id, grocery
    )
      .map(res => res.json())
      .map(data => {
        this.publishUpdates();
      });
  }

  setDeleteFlag(grocery: Grocery) {
    if (Logger.isEnabled) {
      Logger.log('setting a grocery as deleted = ' + grocery);
    }

    return this.backendService.update(
      this.basePath, grocery.id, { Deleted: true, Done: false }
    )
      .map(res => res.json())
      .map(data => {
        grocery.deleted = true;
        grocery.deleting = false;
        grocery.done = false;
        this.publishUpdates();
      });
  }

  toggleDoneFlag(grocery: Grocery) {
    if (Logger.isEnabled) {
      Logger.log('toggling a grocery\'s "done" flag = ' + grocery);
    }

    return this.backendService.update(
      this.basePath, grocery.id, { Done: !grocery.done }
    )
      .map(res => res.json())
      .map(data => {
        grocery.done = !grocery.done;
        this.publishUpdates();
      });
  }

  itemsToRestore(): string[] {
    let indeces: string[] = [];

    this._allItems.forEach((grocery: Grocery) => {
      if (grocery.deleted && grocery.done) {
        indeces.push(grocery.id);
      }
    });

    return indeces;
  }

  restore(indeces: string[]) {
    let body = JSON.stringify({
      Deleted: false,
      Done: false
    });

    if (Logger.isEnabled) {
      Logger.log('restoring groceries = ' + indeces);
    }

    return this.backendService.updateAll(
      this.basePath, indeces, body
    )
      .map(res => res.json())
      .map(data => {
        this._allItems.forEach((grocery) => {
          if (grocery.deleted && grocery.done) {
            grocery.deleted = false;
            grocery.deleting = false;
            grocery.done = false;
          }
        });
        this.publishUpdates();
      });
  }

  delete(grocery: Grocery) {
    if (Logger.isEnabled) {
      Logger.log('deleting a grocery = ' + grocery);
    }

    return this.backendService
      .delete(
      this.basePath, grocery.id
      )
      .map(res => res.json())
      .map(data => {
        grocery.deleted = true;
        grocery.deleting = false;
        let index = this._allItems.indexOf(grocery);
        this._allItems.splice(index, 1);
        this.publishUpdates();
      });
  }

  private publishUpdates() {
    // Make sure all updates are published inside NgZone so that change detection is triggered if needed
    this.worker.run(() => {
      // must emit a *new* value (immutability!)
      this.items.next([...this._allItems]);
    });
  }
}
