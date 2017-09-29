import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../../x-shared/app/shared';
import { BackendService } from '../../x-shared/app/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private backendService: BackendService, private router: Router) { }

  canActivate() {
    if (Logger.isEnabled) {
      Logger.log('checking access...');
    }

    if (this.backendService.isLoggedIn()) {
      return true;
    }
    else {
      if (Logger.isEnabled) {
        Logger.log('user not authenticated => redirection to login');
      }

      this.router.navigate(['/login']);
      return false;
    }
  }
}
