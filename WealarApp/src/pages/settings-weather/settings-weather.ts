import { SettingsProvider } from './../../providers/settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-weather',
  templateUrl: 'settings-weather.html',
})
export class SettingsWeatherPage {

  weatherNotification: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsProvider: SettingsProvider) {
    this.weatherNotification = this.settingsProvider.getWeatherMode();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad presencePage');
  }

  setWeatherMode(){
    console.log('weatherNotification:', this.weatherNotification);
    this.settingsProvider.setNotificationMode(this.settingsProvider.activemode, this.settingsProvider.smsNotification,this.weatherNotification, this.settingsProvider.presenceNotification).subscribe(allowed => {
      if (allowed) {
        console.log("Security mode", this.settingsProvider.activemode);
        console.log("WeatherState",this.settingsProvider.weatherNotification);
      } else {
        console.log("Erreur");
        console.log("Security mode", this.settingsProvider.activemode);
        console.log("WeatherState",this.settingsProvider.weatherNotification);
      }
    },
      error => {
        console.log("Erreur",error);
      });
  }

}