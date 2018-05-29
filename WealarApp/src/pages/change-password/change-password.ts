import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  loading: Loading;
  passwordCredentials = { oldpassword:'', password: '', confirm_password: '' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public changePassword() {
    if (this.passwordCredentials.password == this.passwordCredentials.confirm_password) {
      this.showLoading('Changing password');
      this.auth.changePassword(this.passwordCredentials).subscribe(allowed => {
        if (allowed) {
          this.showError("Success", "Password changed.");
          this.passwordCredentials = { oldpassword:'', password: '', confirm_password: '' }
          this.nav.pop();
        } else {
          this.showError("Fail","Incorrect password");
          this.passwordCredentials = { oldpassword:'', password: '', confirm_password: '' }
        }
      },
        error => {
          this.showError("Fail",error);
        });
    }
    else {
      this.showError("Fail","Passwords are not the same.");
    }
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(status,text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: status,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}

