import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared';

import { GroceriesComponent } from './groceries.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'groceries', pathMatch: 'full', component: GroceriesComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class GroceriesRoutingModule {

}
