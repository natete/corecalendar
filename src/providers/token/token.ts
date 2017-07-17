import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

@Injectable()
export class TokenProvider {

  private readonly AUTH_INFO_KEY = 'corestudio-auth';

  constructor(private events: Events) { }

  getAccessToken(): any {
    const authInfo = localStorage.getItem(this.AUTH_INFO_KEY);
    return authInfo ? JSON.parse(authInfo).token : null;
  }

  setAuthInfo(authInfo: any = {}) {
    localStorage.setItem(this.AUTH_INFO_KEY, JSON.stringify(authInfo));
  }

  getRefreshToken() {
    const authInfo = localStorage.getItem(this.AUTH_INFO_KEY);
    return authInfo ? JSON.parse(authInfo).refreshToken : null;
  }

  clearToken() {
    localStorage.removeItem(this.AUTH_INFO_KEY);
    this.events.publish('token_cleared');
  }

  setAccessToken(token: string = '') {
    const rawAuthInfo = localStorage.getItem(this.AUTH_INFO_KEY);
    const authInfo = rawAuthInfo && JSON.parse(rawAuthInfo);
    authInfo.token = token;
    this.setAuthInfo(authInfo)
  }
}
