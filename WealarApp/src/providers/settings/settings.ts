import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsProvider {

  //variable 
    //sensibility
  activemode: number;
    //sms
  smsNotification: boolean;
    //presence
  presenceNotification: boolean;
    //weather
  weatherNotification: boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };
  
  constructor(public http: HttpClient) {
  }
  
  public setHeader(header){
    this.httpOptions = header;
    console.log("Header settingsProvider",this.httpOptions);
  }

  //Sensibility
  getMode() {
    return this.activemode;
  }

  setMode(activemode){
    return this.activemode=activemode;
  }

  changeMode(mode:string){
    if(mode=="LOW"){
      return this.activemode = 0;
    }
    if(mode=="MEDIUM"){
      return this.activemode = 1;
    }
    if(mode=="HIGH"){
      return this.activemode = 2;
    }
  }

  //Notification
    //sms
  getSmsMode(){
    return this.smsNotification;
  }

  setSmsMode(state){
    console.log('SmsMode State',state);
    this.smsNotification = state;
  }

  //presence
  getPresenceMode(){
    return this.presenceNotification;
  }

  setPresenceMode(state){
    console.log('PresenceMode State',state);
    this.presenceNotification = state;
  }

  //weather
  getWeatherMode(){
    return this.weatherNotification;
  }

  setWeatherMode(state){
    console.log('weather State',state);
    this.weatherNotification = state;
  }

  setNotificationMode(security, sms, weather, presence){
    return Observable.create(observer => {
      let httpParams = {
        securityMode: security,
				smsNotification: sms,
				weatherNotification: weather,
				presenceNotification: presence
      };

      this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/preferences", httpParams, this.httpOptions)
        .subscribe(
          (val) => {
            this.weatherNotification = weather;
            this.smsNotification = sms;
            this.activemode = security;
            this.presenceNotification = presence;
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
