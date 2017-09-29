import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginService } from '../../x-shared/app/login';

import { loginRouting } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    loginRouting
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
