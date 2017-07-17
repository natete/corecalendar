import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
})
export class LoginPage {

  username: string;
  password: string;
  errorMessage: string;
  private loader: Loading;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private authProvider: AuthProvider) { }

  login() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this.authProvider.login(this.username, this.password)
        .subscribe(
            () => this.handleLoginSuccess(),
            (res) => this.handleLoginError(res.json().message)
        );
  }

  private handleLoginSuccess() {
    this.loader.dismissAll();
    this.navCtrl.setRoot(HomePage);
  }

  private handleLoginError(error: string) {
    this.loader.dismissAll();
    this.errorMessage = error;
  }
}
