import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../x-shared/app/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent {

  constructor(private _loginService: LoginService,
    private _router: Router) { }

  logoff() {
    if (confirm("Do you really want to log off?") == true) {
      this._loginService.logoff();
      this._router.navigate(['/login']);
    }
  }

}
