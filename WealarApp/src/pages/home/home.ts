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
      //this.todayWeather = this.weatherList[0];
      //this.weatherList = this.weatherList.slice(1);
      console.log('weatherList',this.weatherList);
      //console.log('todayWeather',this.todayWeather);
    });
  }

  doRefresh(refresher: Refresher) {
    this.dataProvider.getWeatherList().subscribe(data => {
      this.weatherList = this.dataProvider.weatherData;
      //this.todayWeather = this.weatherList[0];
      //this.weatherList = this.weatherList.slice(1);
      console.log('weatherList',this.weatherList);
      //console.log('todayWeather',this.todayWeather);
      
      console.log('DOREFRESH', refresher);
      refresher.complete();
    });
  }
}