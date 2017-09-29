import { Pipe, PipeTransform } from '@angular/core';

import { Grocery } from '../../x-shared/app/groceries';

@Pipe({
  name: 'itemStatus'
})
export class GroceryStatusPipe implements PipeTransform {
  value: Array<Grocery> = [];
  transform(items: Array<Grocery>, deleted: boolean) {
    if (items && items.length) {
      this.value = items.filter((grocery: Grocery) => {
        return grocery.deleted === deleted;
      });
    }
    return this.value;
  }
}
