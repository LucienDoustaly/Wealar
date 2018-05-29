import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-settings-sensibility',
  templateUrl: 'settings-sensibility.html',
})
export class SettingsSensibilityPage {
  activemode: number;
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public settingsProvider: SettingsProvider) {
  }

  ionViewWillEnter() {//Do something before show the page
    console.log("SettingsProvider activeMode:",this.settingsProvider.activemode);
    this.activemode=this.settingsProvider.activemode;
    this.mode=this.convertActivemode(this.settingsProvider.activemode);
  }

  items: any = {
    'LOW': [
      {
        message: 'In LOW MODE presence detector sensibility is deactivated.'
      }
    ],
    'MEDIUM': [
      {
        message: 'In MEDIUM MODE presence detector sensibility is low.'
      }
    ],
    'HIGH': [
      {
        message: 'In HIGH MODE presence detector sensibility is high.'
      }
    ]
  };

  getItems(type: any) {
    return this.items[type];
  }

  changeMode(mode){
    this.settingsProvider.changeMode(mode);
    this.activemode=this.settingsProvider.activemode;
    console.log('Activemode envoyé:', this.activemode);
    this.settingsProvider.setNotificationMode(this.activemode, this.settingsProvider.smsNotification,this.settingsProvider.weatherNotification, this.settingsProvider.presenceNotification).subscribe(allowed => {
      if (allowed) {
        console.log("Activemode mise a jour",this.settingsProvider.activemode);
      } else {
        console.log("Erreur");
        console.log("Activemode",this.settingsProvider.activemode);
      }
    },
      error => {
        console.log("Erreur",error);
      });
  }

  convertActivemode(activemode){
    if(activemode==0)
      return "LOW";
    if(activemode==1)
      return "MEDIUM";
    if(activemode==2)
      return "HIGH";
  }

  doConfirm(mode) {
    let alert = this.alertCtrl.create({
      title: 'Change the mode',
      message: 'Are you sure you want to change the mode to: '+ mode +'?',
      buttons: [
        {
          text: "NO",
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            console.log('Agree clicked');
            this.changeMode(mode);
          }
        }
      ]
    });

    alert.present();

  }
}
