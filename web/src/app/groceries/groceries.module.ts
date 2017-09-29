import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { GroceriesRoutingModule } from './groceries-routing.module';

import { GroceryService } from '../../x-shared/app/groceries';

import { GroceriesComponent } from './groceries.component';
import { GroceryStatusPipe } from './grocery-status.pipe';
import { GroceryListComponent } from './grocery-list';

@NgModule({
  imports: [
    HttpModule,
    GroceriesRoutingModule, 
    SharedModule
  ],
  declarations: [
    GroceriesComponent,
    GroceryListComponent,
    GroceryStatusPipe
  ],
  providers: [GroceryService],
  exports: [
    GroceriesComponent,
    GroceryListComponent
  ]
})
export class GroceriesModule { }
