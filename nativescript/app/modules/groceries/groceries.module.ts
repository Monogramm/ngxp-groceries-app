import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { GroceryService } from '../../x-shared/app/groceries';

import { groceriesRouting } from './groceries.routing';
import { GroceriesComponent } from './groceries.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryStatusPipe } from './grocery-list/grocery-status.pipe';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    groceriesRouting
  ],
  declarations: [
    GroceriesComponent,
    GroceryListComponent,
    GroceryStatusPipe
  ],
  providers: [GroceryService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GroceriesModule {}
