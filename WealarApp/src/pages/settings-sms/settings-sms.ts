import { SettingsProvider } from './../../providers/settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-sms',
  templateUrl: 'settings-sms.html',
})
export class SettingsSmsPage {

  smsNotification: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsProvider: SettingsProvider) {
    this.smsNotification = this.settingsProvider.getSmsMode();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsSmsPage');
  }

  setSmsMode(){
    console.log('smsNotification:', this.smsNotification);
    this.settingsProvider.setNotificationMode(this.settingsProvider.activemode, this.smsNotification,this.settingsProvider.weatherNotification, this.settingsProvider.presenceNotification).subscribe(allowed => {
      if (allowed) {
        console.log("SmsState",this.settingsProvider.smsNotification);
      } else {
        console.log("Erreur");
        console.log("SmsState",this.settingsProvider.smsNotification);
      }
    },
      error => {
        console.log("Erreur",error);
      });
  }

}
