import { SettingsProvider } from './../settings/settings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DataProvider } from '../data/data';

export class User {
  username: string;
  wealarid: string;
  phone: string;

  constructor(username: string, wealarid: string, phone: string) {
    this.username = username;
    this.wealarid = wealarid;
    this.phone = phone;
  }

  set(username: string, wealarid: string, phone: string) {
    this.username = username;
    this.wealarid = wealarid;
    this.phone = phone;
  }
}

interface Response {
  data: {
    Token: string;
    UserName: string;
    WEALARID: string;
    Preferences: {
      presenceNotification: boolean;
      smsNotification: boolean;
      weatherNotification: boolean;
      securityMode: number;
    };
    Phone: string;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;
  password: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  token: string;

  constructor(private http: HttpClient, private settingsProvider: SettingsProvider, private dataProvider: DataProvider) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let httpParams = {
          username: credentials.username,
          password: credentials.password
        };

        this.http.post<Response>("https://wealarapi.herokuapp.com/public/login", httpParams, this.httpOptions)
          .subscribe(
            (val) => {
              this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+val.data.Token);
              this.settingsProvider.setHeader(this.httpOptions);
              this.dataProvider.setHeader(this.httpOptions);

              this.currentUser = new User(val.data.UserName, val.data.WEALARID, val.data.Phone);
              this.password = credentials.password;
              this.settingsProvider.setPresenceMode(val.data.Preferences.presenceNotification);
              this.settingsProvider.setSmsMode(val.data.Preferences.smsNotification);
              this.settingsProvider.setWeatherMode(val.data.Preferences.weatherNotification);
              this.settingsProvider.setMode(val.data.Preferences.securityMode);
              console.log("Settings Provider MODE",this.settingsProvider.activemode);
              let access = (val.data.Token != null);
              observer.next(access);
              observer.complete();
              console.log("POST call successful value returned in body",
                val);
              console.log("current user", this.currentUser);
            },
            response => {
              console.log("POST call in error", response);
              let access = false;
              observer.next(access);
            },
            () => {
              console.log("The POST observable is now completed.");
              observer.complete();
            });
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public changeInformation(credentials) {
    return Observable.create(observer => {
      let httpParams = {
        username: credentials.username,
        phone: credentials.userphone
      };

      this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/userinfos", httpParams, this.httpOptions)
        .subscribe(
          (val) => {
            this.currentUser.set(credentials.username, this.currentUser.wealarid, credentials.userphone);
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

  public firstCo(credentials) {
    return Observable.create(observer => {
      let httpParams = {
        username: credentials.username,
				phone: credentials.userphone,
				oldPassword: this.password,
				newPassword: credentials.password
      };

      this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/firstco", httpParams, this.httpOptions)
        .subscribe(
          (val) => {
            this.currentUser.set(credentials.username, this.currentUser.wealarid, credentials.userphone);
            observer.next(true);
            this.password = '';
            console.log("POST call successful value returned in body",
              val);
          },
          response => {
            console.log("POST call in error", response);
            console.log("Credentials", httpParams);
            observer.next(false);
          },
          () => {
            console.log("The POST observable is now completed.");
            observer.complete();
          });
    });
  }

  public changePassword(credentials) {
      return Observable.create(observer => {
        let httpParams = {
          oldPassword: credentials.oldpassword,
          newPassword: credentials.password
        };

        this.http.put<Response>("https://wealarapi.herokuapp.com/common/user/change/password", httpParams, this.httpOptions)
          .subscribe(
            (val) => {
              observer.next(true);
              console.log("POST call successful value returned in body",
                val);
            },
            response => {
              console.log('Parameters',httpParams);
              console.log("POST call in error", response);
              observer.next(false);
            },
            () => {
              console.log("The POST observable is now completed.");
              observer.complete();
            });
      });
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.http.delete("https://wealarapi.herokuapp.com/common/logout", this.httpOptions)
        .subscribe(
          (val) => {
            this.currentUser = null;
            observer.next(true);
            console.log("POST call successful value returned in body",
              val);
            console.log("current user", this.currentUser);
          },
          response => {
            console.log("POST call in error", response);
            this.currentUser = null;
            observer.next(true);
          },
          () => {
            console.log("The POST observable is now completed.");
            observer.complete();
          });
    });
  }
}