import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../app/environments/environment';
import { TokenProvider } from '../token/token';

@Injectable()
export class AuthProvider {

  constructor(private http: Http,
              private tokenProvider: TokenProvider) { }

  login(username, password): Observable<void> {

    return this.http.post(`${environment.baseUrl}/auth/login`, { username, password })
               .map(res => this.handleAuthResponse(res));
  }

  private handleAuthResponse(authInfo: any): void {
    this.tokenProvider.setAuthInfo(authInfo);
  }
}
