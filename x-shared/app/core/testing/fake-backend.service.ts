import { ClassProvider } from '@angular/core';

import { BackendService } from '../backend.service';
import { Pagination } from '../../shared/models';

export { BackendService } from '../backend.service';

export class FakeBackendService implements BackendService {

  isLoggedIn(): boolean { return true; }

  get token(): string { return 'dummy_tken'; }
  set token(theToken: string) { }

  get userId(): string { return 'dummy_user_id'; }
  set userId(theId: string) { }

  load(path: string, pagination?: Pagination) { }

  getById(path: string, id: string, headers?: { header: string, value: any }[]) { }
  getByIds(path: string, ids: string[], headers?: { header: string, value: any }[]) { }

  add(path: string, value: any, headers?: { header: string, value: any }[]) { }
  addAll(path: string, values: any[], headers?: { header: string, value: any }[]) { }

  update(path: string, id: string, value: any, headers?: { header: string, value: any }[]) { }
  updateAll(path: string, ids: string[], values: any, headers?: { header: string, value: any }[]) { }

  delete(path: string, id: string, headers?: { header: string, value: any }[]) { }
  deleteAll(path: string, ids: string[], headers?: { header: string, value: any }[]) { }
}

export let fakeBackendServiceProvider: ClassProvider = {
  provide: BackendService,
  useClass: FakeBackendService
};
