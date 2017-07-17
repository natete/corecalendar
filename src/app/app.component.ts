import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as moment from 'moment';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login.page';
import { TokenProvider } from '../providers/token/token';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private events: Events,
              private tokenProvider: TokenProvider) {
    moment.locale('es-ES');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    if (this.tokenProvider.getAccessToken()) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }

    this.events.subscribe('token_cleared',
        () => this.rootPage = LoginPage);
  }
}

