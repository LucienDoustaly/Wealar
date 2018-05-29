import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Weather{
  code: number,
  data: {
    weather:{

    }
  },
  name
};

interface Alarm{
  code: number,
  data: {
    alarm:{

    }
  },
  name
};

@Injectable()
export class DataProvider {

  weatherData: any;
  alarmData: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };
  
  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
    this.weatherData = [];
    this.alarmData = [];
  }

  public setHeader(header){
    this.httpOptions = header;
    console.log("Header dataProvider",this.httpOptions);
  }

  public getWeatherList() {
    return Observable.create(observer => {
      this.http.get<Weather>("https://wealarapi.herokuapp.com/data/weather", this.httpOptions)
        .subscribe(
          (val) => {
            this.weatherData = val.data.weather;
            observer.next(true);
            console.log("POST call successful value returned in body",
              val);
            console.log("WeatherData", this.weatherData);
          },
          response => {
            console.log("POST call in error", response);
            observer.next(true);
          },
          () => {
            console.log("The POST observable is now completed.");
            observer.complete();
          });
    });
  }

  public getAlarmData() {
    return Observable.create(observer => {
      this.http.get<Alarm>("https://wealarapi.herokuapp.com/data/alarm", this.httpOptions)
        .subscribe(
          (val) => {
            this.alarmData = val.data.alarm;
            observer.next(true);
            console.log("POST call successful value returned in body",
              val);
            console.log("AlarmData", this.alarmData);
          },
          response => {
            console.log("POST call in error", response);
            observer.next(true);
          },
          () => {
            console.log("The POST observable is now completed.");
            observer.complete();
          });
    });
  }

  public ignorePresence(){
    return Observable.create(observer => {
      this.http.put("https://wealarapi.herokuapp.com/data/alarm",'',this.httpOptions)
        .subscribe(
          (val) => {
            observer.next(true);
            console.log("POST call successful value returned in body",
              val);
          },
          response => {
            console.log("POST call in error", response);
            observer.next(false);
          },
          () => {
            console.log("The POST observable is now completed.");
            observer.complete();
          });
    });
  }

}