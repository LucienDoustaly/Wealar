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
    this.dataProvider.getWeatherList().subscribe(data => {
      this.weatherList = this.dataProvider.weatherData;
      console.log('weatherList',this.weatherList);
    });
  }

  doRefresh(refresher: Refresher) {
    this.dataProvider.getWeatherList().subscribe(data => {
      this.weatherList = this.dataProvider.weatherData;
      console.log('weatherList',this.weatherList);
      
      console.log('DOREFRESH', refresher);
      refresher.complete();
    });
  }
}