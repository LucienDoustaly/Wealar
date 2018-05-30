import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weatherList: any;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    this.dataProvider.getWeatherList().subscribe(data => {//this is an observable we wait for the answer
      this.weatherList = this.dataProvider.weatherData;
      console.log('weatherList',this.weatherList);
    });
  }

  doRefresh(refresher: Refresher) {//take the pull down for argument
    this.dataProvider.getWeatherList().subscribe(data => {//this is an observable we wait for the answer
      this.weatherList = this.dataProvider.weatherData;
      console.log('weatherList',this.weatherList);
      
      console.log('DOREFRESH', refresher);
      refresher.complete();
    });
  }
}