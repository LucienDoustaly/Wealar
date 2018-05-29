import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirstCoChangeInfoPage } from '../first-co-change-info/first-co-change-info';

//Template : https://github.com/ionic-team/ionic-preview-app/tree/master/src/pages/slides/basic

@Component({
  selector: 'page-firstconnection',
  templateUrl: 'firstconnection.html',
})
export class FirstconnectionPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstconnectionPage');
  }

  slides = [
    {
      title: "Welcome to the WEALAR APP!",
      description: "There is your dashboard to remote your wealar system.",
      image: "assets/imgs/app.png",
    },
    {
      title: "What is Wealar?",
      description: "<b>Wealar</b> is a remote connected alarm with a weather station which can allow you to get information of your home",
      image: "assets/imgs/logo_transparent.png",
    },
    {
      title: "What is Wealar app?",
      description: "The <b>wealar application</b> - Powered by Ionic framework - will allow you to remote your wealar alarm anywhere and whenever you want.",
      image: "assets/imgs/ionic-logo.png",
    }
  ];

  goTofirstCoInfo(){
    this.nav.setRoot(FirstCoChangeInfoPage);
  }
}
