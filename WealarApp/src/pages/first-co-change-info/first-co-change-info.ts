import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-first-co-change-info',
  templateUrl: 'first-co-change-info.html',
})
export class FirstCoChangeInfoPage {

  loading: Loading;
  Credentials = { username:'', password: '', confirm_password: '', userphone: '' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public firstConnection() {
    if (this.Credentials.password == this.Credentials.confirm_password) {
      this.showLoading('Changing informations');
      this.auth.firstCo(this.Credentials).subscribe(allowed => {
        if (allowed) {
          this.showError("Success", "Informations changed.");
          this.Credentials = { username:'', password: '', confirm_password: '', userphone: '' };
          this.nav.setRoot(TabsPage);
        } else {
          this.showError("Fail","Unknown Error");
          this.Credentials = { username:'', password: '', confirm_password: '', userphone: '' };
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
