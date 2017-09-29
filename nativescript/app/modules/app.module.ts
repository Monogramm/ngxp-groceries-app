import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { GroceriesModule } from './groceries/groceries.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  providers: [
    AuthGuard
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    CoreModule,
    AppRoutingModule,
    LoginModule, 
    GroceriesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
