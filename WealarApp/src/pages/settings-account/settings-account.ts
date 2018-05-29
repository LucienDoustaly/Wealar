import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { ChangeInformationsPage } from '../change-informations/change-informations';

@Component({
  selector: 'page-settings-account',
  templateUrl: 'settings-account.html',
})
export class SettingsAccountPage {
  userCredentials = { username: '', wealarid:'' ,userphone: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthServiceProvider) {}

  ionViewWillEnter() {//Do something before show the page
    let info = this.auth.getUserInfo();
    this.userCredentials.username = info['username'];
    this.userCredentials.userphone = info['phone'];
    this.userCredentials.wealarid = info['wealarid'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsAccountPage');
  }

  goToChangeInformations() {
    console.log("Go to Change information");
    this.navCtrl.push(ChangeInformationsPage);
  }

}
