import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-change-informations',
  templateUrl: 'change-informations.html',
})
export class ChangeInformationsPage {
  loading: Loading;
  changeSuccess = false;
  userCredentials = { username: '', userphone: '' };

  constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    let info = this.auth.getUserInfo(); //get informaiton of user from the auth provider
    this.userCredentials.username = info['username'];
    this.userCredentials.userphone = info['phone'];
  }

  public changeInformations() {
    this.showLoading("Connexion");
    this.auth.changeInformation(this.userCredentials).subscribe(success => {
      if (success) {
        this.changeSuccess = true;
        this.showPopup("Success", "Information changed.");
      } else {
        this.showPopup("Error", "Problem change information.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showPopup(title, text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.changeSuccess) {
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }
}