import { Logger, Pagination } from '../shared';

import { StorageService } from './storage.service';

export abstract class BackendService {
  protected static readonly apiUrl = 'https://api.everlive.com/v1/GWfRtXi1Lwt4jcqK/';

  protected static readonly tokenKey = 'access_token';
  protected static readonly userIdKey = 'principal_user_id';

  abstract isLoggedIn(): boolean;

  abstract get token(): string;
  abstract set token(theToken: string);

  abstract get userId(): string;
  abstract set userId(theId: string);


  abstract load(path: string, pagination?: Pagination);

  getById(path: string, id: string, headers?: { header: string, value: any }[]) {
    return this.getByIds(path, [id], headers);
  }
  abstract getByIds(path: string, ids: string[], headers?: { header: string, value: any }[]);

  add(path: string, value: any, headers?: { header: string, value: any }[]) {
    return this.addAll(path, [value], headers);
  }
  abstract addAll(path: string, values: any[], headers?: { header: string, value: any }[]);

  update(path: string, id: string, value: any, headers?: { header: string, value: any }[]) {
    return this.updateAll(path, [id], value, headers);
  }
  abstract updateAll(path: string, ids: string[], values: any, headers?: { header: string, value: any }[]);

  delete(path: string, id: string, headers?: { header: string, value: any }[]) {
    return this.deleteAll(path, [id], headers);
  }
  abstract deleteAll(path: string, ids: string[], headers?: { header: string, value: any }[]);
}
