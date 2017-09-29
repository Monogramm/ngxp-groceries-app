import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


import { BackendService } from '../core';
import { Logger, Pagination } from '../shared';
import { User } from '../users/user.model';

@Injectable()
export class LoginService {
  private basePath: string = 'Users';

  private basePathOAuth: string = 'oauth/token';

  private basePathResetPwd: string = 'Users/resetpassword';

  constructor(private backendService: BackendService) {
  }

  isLoggedIn(): boolean {
    return this.backendService.isLoggedIn();
  }

  register(user: User) {
    let body = JSON.stringify({
      username: user.email,
      email: user.email,
      password: user.password
    });

    if (Logger.isEnabled) {
      Logger.log('registering in user = ' + body);
    }

    return this.backendService.add(
      this.basePath, body
    );
  }

  login(user: User) {
    let body = JSON.stringify({
      email: user.email,
      password: user.password,
      grant_type: 'password'
    });

    if (Logger.isEnabled) {
      Logger.log('logging in user = ' + user.email);
    }

    return this.backendService.add(
      this.basePathOAuth, body
    )
      .map(response => response.json())
      .do(data => {
        this.backendService.token = data.Result.access_token;
        this.backendService.userId = data.Result.principal_id;
      });
  }

  logoff() {
    if (Logger.isEnabled) {
      Logger.log('logging off');
    }

    this.backendService.token = '';
    this.backendService.userId = '';
  }

  resetPassword(email: string) {
    let body = JSON.stringify({
      Email: email
    });

    if (Logger.isEnabled) {
      Logger.log('resetting user password = ' + body);
    }

    return this.backendService.add(
      this.basePathResetPwd, body
    );
  }
}
