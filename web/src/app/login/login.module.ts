import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LoginService } from '../../x-shared/app/login';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
