import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { GroceriesComponent } from './groceries/groceries.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      { path: '', pathMatch: 'full', component: GroceriesComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {

}
