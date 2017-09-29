import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GroceriesComponent } from './groceries/groceries.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', pathMatch: 'full', component: LoginComponent },
      { path: '', pathMatch: 'full', component: GroceriesComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
