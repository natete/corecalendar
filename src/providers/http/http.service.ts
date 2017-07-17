import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ErrorCode } from './error-code';
import { TokenProvider } from '../token/token';
import { environment } from '../../app/environments/environment';


@Injectable()
export class HttpService extends Http {

  private refreshing = new BehaviorSubject<boolean>(false);
  private pendingRequests: string[] = [];
  private readonly REFRESH_ENDPOINT = '/auth/refresh';

  constructor(backend: XHRBackend,
              requestOptions: RequestOptions,
              private tokenProvider: TokenProvider) {
    super(backend, requestOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {

    const token = this.tokenProvider.getAccessToken();

    if (token) {
      if (typeof url === 'string') {
        if (!options) {
          options = { headers: new Headers() };
        }
        // if (!url.includes(this.REFRESH_ENDPOINT)) {
        options.headers.set('Authorization', `Bearer ${token}`);
        // }
        options.headers.set('Content-Type', 'application/json');
      } else {
        // we have to add the token to the url object
        // if (!url.url.includes(this.REFRESH_ENDPOINT)) {
        url.headers.set('Authorization', `Bearer ${token}`);
        // }
        url.headers.set('Content-Type', 'application/json');
      }
    }

    return super.request(url, options)
                .map((res: Response) => res.ok ? res.json() : null)
                .catch((error: any, caught: Observable<any>) => this.handleRequestError(error, url, options));
  }


  handleRequestError(error: any, url: string | Request, requestOptions: RequestOptionsArgs): Observable<any> {
    if (error.status === 401) {

      if (error._body && error.json().errorCode === ErrorCode.EXPIRED_TOKEN && !this.refreshing.getValue()) {
        this.refreshing.next(true);
        const refreshToken = this.tokenProvider.getRefreshToken();

        return this.post(`${environment.baseUrl}${this.REFRESH_ENDPOINT}`, { refreshToken })
                   .mergeMap(data => this.handleNewToken(data, url, requestOptions));

      } else if (error._body && error.json().errorCode === ErrorCode.EXPIRED_TOKEN && this.refreshing.getValue()) {
        // Prevents multiple call to refresh
        const requestUrl = typeof url === 'string' ? url : url.url;

        this.pendingRequests.push(requestUrl);

        return this.refreshing.asObservable()
                   .filter(refreshing => !refreshing)
                   .filter(() => this.pendingRequests.indexOf(requestUrl) !== -1)
                   .mergeMap(() => this.handleRefreshCompleted(url, requestOptions, requestUrl));

      } else {
        this.tokenProvider.clearToken();
        // if (this.navCtrl.getActive().name === 'LoginPage') {
        return Observable.throw(error);
        // } else {
        //   return Observable.fromPromise(this.navCtrl.setRoot(LoginPage));
        // }
      }
    } else {
      return Observable.throw(error);
    }
  }

  private handleNewToken(data: any, url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    this.tokenProvider.setAuthInfo(data);
    this.refreshing.next(false);
    return this.request(url, options)
  }

  private handleRefreshCompleted(url, requestOptions: RequestOptionsArgs, requestUrl: string): Observable<any> {
    this.pendingRequests.splice(this.pendingRequests.indexOf(requestUrl), 1);
    return this.request(url, requestOptions);
  }
}
