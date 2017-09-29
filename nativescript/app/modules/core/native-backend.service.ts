import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { Logger, Pagination } from '../../x-shared/app/shared';
import { BackendService, StorageService } from '../../x-shared/app/core';

@Injectable()
export class NativeBackendService extends BackendService {
    public readonly config = {
        apiURL: BackendService.apiUrl
    };

    constructor(private storageService: StorageService, private _http: Http) {
        super();
    }

    isLoggedIn(): boolean {
        return !!this.storageService.getItem(BackendService.tokenKey);
    }

    get token(): string {
        return <string>this.storageService.getItem(BackendService.tokenKey);
    }

    set token(theToken: string) {
        if (Logger.isEnabled) {
            Logger.log('setting new persistent token = ' + theToken);
        }

        this.storageService.setItem(BackendService.tokenKey, theToken);
    }



    get userId(): string {
        return <string>this.storageService.getItem(BackendService.userIdKey);
    }

    set userId(theId: string) {
        if (Logger.isEnabled) {
            Logger.log('setting new persistent user id = ' + theId);
        }

        this.storageService.setItem(BackendService.userIdKey, theId);
    }



    load(path: string, pagination?: Pagination, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);
        httpHeaders.append('X-Everlive-Sort', JSON.stringify({ ModifiedAt: -1 }));

        let url = this.config.apiURL + path;

        if (pagination) {
            let startAt, endAt;
            startAt = (pagination.page - 1) * pagination.size;
            endAt = pagination.page * pagination.size - 1;

            httpHeaders.append('X-Start-At', JSON.stringify({ startAt }));
            httpHeaders.append('X-End-At', JSON.stringify({ endAt }));
        }

        return this._http.get(
            url, { headers: httpHeaders }
        )
            .catch(this.handleErrors);
    }

    getById(path: string, id: string, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        let url = this.config.apiURL + path + '/' + id;

        return this._http
            .get(
            url, { headers: httpHeaders }
            )
            .catch(this.handleErrors);
    }

    getByIds(path: string, ids: string[], headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        httpHeaders = this.appendHeaderIds(httpHeaders, ids);

        let url = this.config.apiURL + path;

        return this._http
            .get(
            url, { headers: httpHeaders }
            )
            .catch(this.handleErrors);
    }

    add(path: string, value: any, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        let url = this.config.apiURL + path;

        return this._http.post(
            url, value, { headers: httpHeaders }
        )
            .catch(this.handleErrors);
    }

    addAll(path: string, values: any[], headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        let url = this.config.apiURL + path;

        return this._http.post(
            url, values, { headers: httpHeaders }
        )
            .catch(this.handleErrors);
    }

    update(path: string, id: string, value: any, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        let url = this.config.apiURL + path + '/' + id;

        return this._http.put(
            url, value, { headers: httpHeaders }
        )
            .catch(this.handleErrors);
    }

    updateAll(path: string, ids: string[], values: any, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        httpHeaders = this.appendHeaderIds(httpHeaders, ids);

        let url = this.config.apiURL + path;

        return this._http.put(
            url, values, { headers: httpHeaders }
        )
            .catch(this.handleErrors);
    }

    delete(path: string, id: string, headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        let url = this.config.apiURL + path + '/' + id;

        return this._http
            .delete(
            url, { headers: httpHeaders }
            )
            .catch(this.handleErrors);
    }

    deleteAll(path: string, ids: string[], headers?: { header: string, value: any }[]) {
        let httpHeaders: Headers = this.getHeaders(headers);

        httpHeaders = this.appendHeaderIds(httpHeaders, ids);

        let url = this.config.apiURL + path;

        return this._http
            .delete(
            url, { headers: httpHeaders }
            )
            .catch(this.handleErrors);
    }

    private getHeaders(headers?: { header: string, value: any }[]): Headers {
        let httpHeaders: Headers = new Headers(headers);

        httpHeaders.append('Content-Type', 'application/json');
        if (this.isLoggedIn()) {
            httpHeaders.append('Authorization', 'Bearer ' + this.token);
        }

        return httpHeaders;
    }

    private appendHeaderIds(httpHeaders: Headers, ids: string[]): Headers {
        httpHeaders.append('X-Everlive-Filter',
            JSON.stringify({
                'Id': {
                    '$in': ids
                }
            })
        );

        return httpHeaders;
    }

    private handleErrors(error: Response) {
        if (Logger.isEnabled) {
            if (typeof error.json === 'function') {
                console.log(JSON.stringify(error.json()));
            } else {
                console.dir(error);
            }
        }
        return Observable.throw(error);
    }

}
