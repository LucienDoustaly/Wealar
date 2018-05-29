import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from "../register/register";
import { TabsPage } from "../tabs/tabs";
import { FirstconnectionPage } from "../firstconnection/firstconnection";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: 'ac1f70d0-9a01-428a-8378-8d3de1ec0ba6', password: 'wealar' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading('Connection attempt');
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        if(this.auth.currentUser.username == this.auth.currentUser.wealarid)
          this.nav.setRoot(FirstconnectionPage);
        else
          this.nav.setRoot(TabsPage);
        
      } else {
        this.showError("Incorrect identifier");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}