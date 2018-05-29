webpackJsonp([0],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__firstconnection_firstconnection__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(nav, auth, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.registerCredentials = { username: '5e33c802-2c7e-4716-b3ca-f1281e9c54b8', password: 'antho' };
    }
    LoginPage.prototype.createAccount = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading('Connection attempt');
        this.auth.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                if (_this.auth.currentUser.username == _this.auth.currentUser.wealarid)
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__firstconnection_firstconnection__["a" /* FirstconnectionPage */]);
                else
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                _this.showError("Incorrect identifier");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    LoginPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\login\login.html"*/'<ion-content class="login-content" padding>\n\n  <ion-row class="logo-row">\n\n    <ion-col>\n\n      <img width="250" height="250" src="assets/imgs/logo_transparent.png" />\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="login-box">\n\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n\n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="registerCredentials.username" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n\n          <!-- <button ion-button class="register-btn" type="button" block clear (click)="createAccount()">Create New Account</button> -->\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </form>\n\n  </div>\n\n\n\n  <ion-footer>\n\n      <p><strong>Tips: </strong>for the first connection <br>your username is your WealarId !</p>\n\n    </ion-footer>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alarm_alarm__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(247);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__alarm_alarm__["a" /* AlarmPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\tabs\tabs.html"*/'<ion-tabs color="dark">\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Alarm" tabIcon="nuclear"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 142:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 142;

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = (function () {
    function RegisterPage(nav, auth, alertCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.createSuccess = false;
        this.registerCredentials = { email: '', password: '' };
    }
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.auth.register(this.registerCredentials).subscribe(function (success) {
            if (success) {
                _this.createSuccess = true;
                _this.showPopup("Success", "Account created.");
            }
            else {
                _this.showPopup("Error", "Problem creating account.");
            }
        }, function (error) {
            _this.showPopup("Error", error);
        });
    };
    RegisterPage.prototype.showPopup = function (title, text) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        if (_this.createSuccess) {
                            _this.nav.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\register\register.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>Register</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n \n\n<ion-content class="login-content" padding>\n\n  <div class="login-box">\n\n    \n\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            \n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n\n            </ion-item>\n\n            \n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Register</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n    </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlarmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlarmPage = (function () {
    function AlarmPage(alertCtrl, dataProvider) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.dataProvider = dataProvider;
        this.dataProvider.getAlarmData().subscribe(function (data) {
            _this.alarmInfo = data.alarm;
            //this.todayWeather = this.weatherList[0];
            //this.weatherList = this.weatherList.slice(1);
            console.log('alarmInfo', _this.alarmInfo);
            //console.log('todayWeather',this.todayWeather);
        });
    }
    AlarmPage.prototype.doDeactivate = function () {
        var alert = this.alertCtrl.create({
            title: 'Your alarm is deactivated',
            message: 'Becareful WEALAR has stopped watching your home !',
            buttons: ['OK']
        });
        alert.present();
    };
    AlarmPage.prototype.doActivate = function () {
        var alert = this.alertCtrl.create({
            title: 'Your alarm is activated',
            message: 'WEALAR is now watching your home !',
            buttons: ['OK']
        });
        alert.present();
    };
    AlarmPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.dataProvider.getAlarmData().subscribe(function (data) {
            _this.alarmInfo = data.alarm;
            //this.todayWeather = this.weatherList[0];
            //this.weatherList = this.weatherList.slice(1);
            console.log('alarmInfo', _this.alarmInfo);
            //console.log('todayWeather',this.todayWeather);
        });
        console.log('DOREFRESH', refresher);
        refresher.complete();
    };
    AlarmPage.prototype.doPulling = function (refresher) {
        console.log('DOPULLING', refresher.progress);
    };
    AlarmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-alarm',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\alarm\alarm.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>\n\n      Alarm\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page">\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" (ionPull)="doPulling($event)">\n\n    <ion-refresher-content\n\n      pullingText="Pull to refresh..."\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  \n\n  <div *ngIf="alarmInfo">\n\n    <ion-card *ngIf="alarmInfo.new" style="border-radius:10px;" color="danger">\n\n      <img src="assets/imgs/box.png" />\n\n      <div class="card-presence">PRESENCE DETECTED !!!</div>\n\n      <div class="card-datealarm">At {{ alarmInfo.time }} on <br>{{ alarmInfo.date }}</div>\n\n    </ion-card>\n\n\n\n    <ion-card *ngIf="!alarmInfo.new" style="border-radius:10px;" color="secondary">\n\n      <img src="assets/imgs/box.png" />\n\n      <div class="card-presence">No presence detected</div>\n\n      <div class="card-datealarm">Since {{ alarmInfo.date }} at {{ alarmInfo.time }}</div>\n\n    </ion-card>\n\n  </div>\n\n\n\n  <ion-list>\n\n    <ion-card>\n\n        <button ion-item>\n\n            <ion-icon name="archive" item-start></ion-icon>\n\n            Logs\n\n        </button>\n\n    </ion-card>\n\n  </ion-list>\n\n\n\n  <ion-footer>\n\n    <div *ngIf="alarmInfo">\n\n      <button ion-button *ngIf="alarmInfo.activated" color="secondary" class="disconnect-button" (click)="doActivate()">Alarm STATUS : Activated</button>\n\n      <button ion-button *ngIf="!alarmInfo.activated" color="danger" class="disconnect-button" (click)="doDeactivate()">Alarm STATUS : Deactivated</button>\n\n    </div>\n\n      <p><strong>Tips: </strong>Swipe down to refresh !</p>\n\n  </ion-footer>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\alarm\alarm.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */]])
    ], AlarmPage);
    return AlarmPage;
}());

//# sourceMappingURL=alarm.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    //todayWeather: any;
    function HomePage(navCtrl, dataProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dataProvider = dataProvider;
        this.dataProvider.getWeatherList().subscribe(function (data) {
            _this.weatherList = data.weather;
            //this.todayWeather = this.weatherList[0];
            //this.weatherList = this.weatherList.slice(1);
            console.log('weatherList', _this.weatherList);
            //console.log('todayWeather',this.todayWeather);
        });
    }
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.dataProvider.getWeatherList().subscribe(function (data) {
            _this.weatherList = data.weather;
            //this.todayWeather = this.weatherList[0];
            //this.weatherList = this.weatherList.slice(1);
            console.log('weatherList', _this.weatherList);
            //console.log('todayWeather',this.todayWeather);
        });
        console.log('DOREFRESH', refresher);
        refresher.complete();
    };
    HomePage.prototype.doPulling = function (refresher) {
        console.log('DOPULLING', refresher.progress);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>\n\n      Home\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n \n\n<ion-content class="card-background-page">\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" (ionPull)="doPulling($event)">\n\n    <ion-refresher-content\n\n      pullingText="Pull to refresh..."\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <ion-card style="border-radius:10px;" *ngIf="weatherList">\n\n      <img *ngIf="weatherList.night" src="assets/imgs/night.jpg"/>\n\n      <img *ngIf="!weatherList.night"src="assets/imgs/sun.jpg"/>\n\n    <div class="card-day">{{ weatherList.day }}</div>\n\n    <div class="card-date">{{ weatherList.date }}</div>\n\n  </ion-card>\n\n   \n\n  <ion-grid *ngIf="weatherList">\n\n      <ion-row>\n\n        <ion-col>\n\n            <ion-card style="border-radius:20px;">\n\n                <img src="assets/imgs/temperature.jpg"/>\n\n                <div class="card-center">{{ weatherList.temperature }}°C</div>\n\n            </ion-card>\n\n        </ion-col>\n\n        <ion-col>\n\n            <ion-card style="border-radius:20px;">\n\n                <img src="assets/imgs/humidity.jpg"/>\n\n                <div class="card-center">{{ weatherList.humidity }}%</div>\n\n                <div class="card-value">humidity</div>\n\n            </ion-card>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n <!-- \n\n    -->\n\n\n\n  <!-- Pas le temps d\'implémenter *ngIf="weatherList.humidity>=75" name="sunny"\n\n  <ion-list no-lines *ngFor="let weather of weatherList" value="weather" class="list">\n\n    <ion-card>\n\n        <button ion-item>\n\n            <ion-icon *ngIf="weather.humidity>=75" name="sunny" item-start></ion-icon>\n\n            {{ weather.day }} {{ weather.temperature }}°C {{ weather.humidity }}% d\'humidité\n\n            <ion-icon *ngIf="weather.humidity<75" name="cloud" item-start></ion-icon>\n\n        </button>\n\n    </ion-card>\n\n  </ion-list>\n\n  -->\n\n\n\n  <ion-footer>\n\n    <p><strong>Tips: </strong>Swipe down to refresh !</p>\n\n  </ion-footer>\n\n\n\n  </ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_sensibility_settings_sensibility__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_sms_settings_sms__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_weather_settings_weather__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_presence_settings_presence__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__settings_account_settings_account__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__change_password_change_password__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SettingsPage = (function () {
    function SettingsPage(navCtrl, auth, app) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.app = app;
        this.userCredentials = { username: '', wealarid: '' };
    }
    SettingsPage.prototype.ionViewWillEnter = function () {
        var info = this.auth.getUserInfo();
        this.userCredentials.username = info['username'];
        this.userCredentials.wealarid = info['wealarid'];
    };
    SettingsPage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        });
    };
    SettingsPage.prototype.goToSensibility = function () {
        console.log("Go to Presence");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__settings_sensibility_settings_sensibility__["a" /* SettingsSensibilityPage */]);
    };
    SettingsPage.prototype.goToSms = function () {
        console.log("Go to Sms");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_sms_settings_sms__["a" /* SettingsSmsPage */]);
    };
    SettingsPage.prototype.goToWeather = function () {
        console.log("Go to weather");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__settings_weather_settings_weather__["a" /* SettingsWeatherPage */]);
    };
    SettingsPage.prototype.goToPresence = function () {
        console.log("Go to presence");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__settings_presence_settings_presence__["a" /* SettingsPresencePage */]);
    };
    SettingsPage.prototype.goToAccount = function () {
        console.log("Go to account");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__settings_account_settings_account__["a" /* SettingsAccountPage */]);
    };
    SettingsPage.prototype.goToChangePassword = function () {
        console.log("Go to Change password");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__change_password_change_password__["a" /* ChangePasswordPage */]);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>\n\n      Settings\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="card-background-page">\n\n  <ion-card>\n\n    <ion-card-header>\n\n      <button ion-item (click)=\'goToAccount()\'>\n\n        <ion-icon name="contact" item-start></ion-icon>\n\n        <strong>Account informations</strong>\n\n        <br> username: {{ userCredentials.username }}\n\n      </button>\n\n    </ion-card-header>\n\n\n\n    <ion-list>\n\n      <button ion-item (click)="goToSensibility()">\n\n        <ion-icon name="alert" item-start></ion-icon>\n\n        Security Mode\n\n      </button>\n\n\n\n      <button ion-item (click)="goToSms()">\n\n        <ion-icon name="chatbubbles" item-start></ion-icon>\n\n        Receive Informations by SMS\n\n      </button>\n\n\n\n      <button ion-item (click)="goToWeather()">\n\n        <ion-icon name="notifications" item-start></ion-icon>\n\n        Weather Notifications\n\n      </button>\n\n\n\n      <button ion-item (click)="goToPresence()">\n\n        <ion-icon name="body" item-start></ion-icon>\n\n        Presence Notifications\n\n      </button>\n\n\n\n    </ion-list>\n\n  </ion-card>\n\n\n\n  <ion-card>\n\n\n\n    <ion-list>\n\n      \n\n      <button ion-item (click)=\'goToChangePassword()\'>\n\n        <ion-icon name="lock" item-start></ion-icon>\n\n        Change password\n\n      </button>\n\n\n\n    </ion-list>\n\n  </ion-card>\n\n\n\n\n\n  <ion-footer>\n\n    <button ion-button color="danger" class="disconnect-button" (click)="logout()">LOGOUT</button>\n\n  </ion-footer>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsSensibilityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_settings_settings__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsSensibilityPage = (function () {
    function SettingsSensibilityPage(navCtrl, navParams, alertCtrl, settingsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.settingsProvider = settingsProvider;
        this.items = {
            'LOW': [
                {
                    message: 'In LOW MODE presence detector sensibility is deactivated.'
                }
            ],
            'MEDIUM': [
                {
                    message: 'In MEDIUM MODE presence detector sensibility is low.'
                }
            ],
            'HIGH': [
                {
                    message: 'In HIGH MODE presence detector sensibility is high.'
                }
            ]
        };
    }
    SettingsSensibilityPage.prototype.ionViewWillEnter = function () {
        console.log("SettingsProvider activeMode:", this.settingsProvider.activemode);
        this.activemode = this.settingsProvider.activemode;
        this.mode = this.convertActivemode(this.settingsProvider.activemode);
    };
    SettingsSensibilityPage.prototype.getItems = function (type) {
        return this.items[type];
    };
    SettingsSensibilityPage.prototype.changeMode = function (mode) {
        var _this = this;
        this.settingsProvider.changeMode(mode);
        this.activemode = this.settingsProvider.activemode;
        console.log('Activemode envoyé:', this.activemode);
        this.settingsProvider.setNotificationMode(this.activemode, this.settingsProvider.smsNotification, this.settingsProvider.weatherNotification, this.settingsProvider.presenceNotification).subscribe(function (allowed) {
            if (allowed) {
                console.log("Activemode mise a jour", _this.settingsProvider.activemode);
            }
            else {
                console.log("Erreur");
                console.log("Activemode", _this.settingsProvider.activemode);
            }
        }, function (error) {
            console.log("Erreur", error);
        });
    };
    SettingsSensibilityPage.prototype.convertActivemode = function (activemode) {
        if (activemode == 0)
            return "LOW";
        if (activemode == 1)
            return "MEDIUM";
        if (activemode == 2)
            return "HIGH";
    };
    SettingsSensibilityPage.prototype.doConfirm = function (mode) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Change the mode',
            message: 'Are you sure you want to change the mode to: ' + mode + '?',
            buttons: [
                {
                    text: "NO",
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'YES',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.changeMode(mode);
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsSensibilityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings-sensibility',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-sensibility\settings-sensibility.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    <ion-title>Security Mode</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="background">\n\n\n\n  <ion-card>\n\n    <ion-card-header>\n\n      ACTIVE MODE : {{ convertActivemode(activemode) }}\n\n    </ion-card-header>\n\n    <ion-card-content [(ngModel)]="mode">\n\n      <ion-segment color="dark">\n\n        <ion-segment-button value="LOW">\n\n          LOW\n\n        </ion-segment-button>\n\n        <ion-segment-button value="MEDIUM" ng-selected="selected">\n\n          MEDIUM\n\n        </ion-segment-button>\n\n        <ion-segment-button value="HIGH">\n\n          HIGH\n\n        </ion-segment-button>\n\n      </ion-segment>\n\n      <ion-list style="margin: 0" inset *ngFor="let sItem of getItems(mode)">\n\n        <ion-card-content>\n\n          {{ sItem.message }}\n\n        </ion-card-content>\n\n      </ion-list>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-footer>\n\n    <button ion-button color="danger" class="choose-button" (click)="doConfirm(mode)">Activate mode : {{ mode }}</button>\n\n  </ion-footer>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-sensibility\settings-sensibility.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_settings_settings__["a" /* SettingsProvider */]])
    ], SettingsSensibilityPage);
    return SettingsSensibilityPage;
}());

//# sourceMappingURL=settings-sensibility.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsSmsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsSmsPage = (function () {
    function SettingsSmsPage(navCtrl, navParams, settingsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingsProvider = settingsProvider;
        this.smsNotification = this.settingsProvider.getSmsMode();
    }
    SettingsSmsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsSmsPage');
    };
    SettingsSmsPage.prototype.setSmsMode = function () {
        var _this = this;
        console.log('smsNotification:', this.smsNotification);
        this.settingsProvider.setNotificationMode(this.settingsProvider.activemode, this.smsNotification, this.settingsProvider.weatherNotification, this.settingsProvider.presenceNotification).subscribe(function (allowed) {
            if (allowed) {
                console.log("SmsState", _this.settingsProvider.smsNotification);
            }
            else {
                console.log("Erreur");
                console.log("SmsState", _this.settingsProvider.smsNotification);
            }
        }, function (error) {
            console.log("Erreur", error);
        });
    };
    SettingsSmsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-settings-sms',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-sms\settings-sms.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    <ion-title>SMS Notification</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="card-background-page">\n\n\n\n  <ion-card>\n\n\n\n    <ion-item no-lines>\n\n      <ion-label>\n\n        <ion-icon name="chatbubbles" item-start></ion-icon> Activate sms notifications</ion-label>\n\n      <ion-toggle [(ngModel)]="smsNotification" (click)=\'setSmsMode()\'></ion-toggle>\n\n    </ion-item>\n\n\n\n    <ion-card-content>\n\n        If you want to receive the notifications by sms, activate it here.\n\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-sms\settings-sms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__["a" /* SettingsProvider */]])
    ], SettingsSmsPage);
    return SettingsSmsPage;
}());

//# sourceMappingURL=settings-sms.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsWeatherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsWeatherPage = (function () {
    function SettingsWeatherPage(navCtrl, navParams, settingsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingsProvider = settingsProvider;
        this.weatherNotification = this.settingsProvider.getWeatherMode();
    }
    SettingsWeatherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad presencePage');
    };
    SettingsWeatherPage.prototype.setWeatherMode = function () {
        var _this = this;
        console.log('weatherNotification:', this.weatherNotification);
        this.settingsProvider.setNotificationMode(this.settingsProvider.activemode, this.settingsProvider.smsNotification, this.weatherNotification, this.settingsProvider.presenceNotification).subscribe(function (allowed) {
            if (allowed) {
                console.log("Security mode", _this.settingsProvider.activemode);
                console.log("WeatherState", _this.settingsProvider.weatherNotification);
            }
            else {
                console.log("Erreur");
                console.log("Security mode", _this.settingsProvider.activemode);
                console.log("WeatherState", _this.settingsProvider.weatherNotification);
            }
        }, function (error) {
            console.log("Erreur", error);
        });
    };
    SettingsWeatherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-settings-weather',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-weather\settings-weather.html"*/'<ion-header>\n\n\n\n    <ion-navbar color="dark">\n\n      <ion-title>Weather Notification </ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content class="card-background-page">\n\n  \n\n    <ion-card>\n\n  \n\n      <ion-item no-lines>\n\n        <ion-label>\n\n          <ion-icon name="notifications" item-start></ion-icon> Activate weather notifications</ion-label>\n\n        <ion-toggle [(ngModel)]="weatherNotification" (click)=\'setWeatherMode()\'></ion-toggle>\n\n      </ion-item>\n\n  \n\n      <ion-card-content>\n\n          If you want to receive a notification for the weather every day, activate it here.\n\n      </ion-card-content>\n\n  \n\n    </ion-card>\n\n  \n\n  </ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-weather\settings-weather.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__["a" /* SettingsProvider */]])
    ], SettingsWeatherPage);
    return SettingsWeatherPage;
}());

//# sourceMappingURL=settings-weather.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPresencePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPresencePage = (function () {
    function SettingsPresencePage(navCtrl, navParams, settingsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingsProvider = settingsProvider;
        this.presenceNotification = this.settingsProvider.getPresenceMode();
    }
    SettingsPresencePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad presencePage');
    };
    SettingsPresencePage.prototype.setPresenceMode = function () {
        var _this = this;
        console.log('presenceNotification:', this.presenceNotification);
        this.settingsProvider.setNotificationMode(this.settingsProvider.activemode, this.settingsProvider.smsNotification, this.settingsProvider.weatherNotification, this.presenceNotification).subscribe(function (allowed) {
            if (allowed) {
                console.log("PresenceState", _this.settingsProvider.presenceNotification);
            }
            else {
                console.log("Erreur");
                console.log("PresenceState", _this.settingsProvider.presenceNotification);
            }
        }, function (error) {
            console.log("Erreur", error);
        });
    };
    SettingsPresencePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-settings-presence',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-presence\settings-presence.html"*/'<ion-header>\n\n\n\n    <ion-navbar color="dark">\n\n      <ion-title>Presence notification</ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content class="card-background-page">\n\n  \n\n    <ion-card>\n\n  \n\n      <ion-item no-lines>\n\n        <ion-label>\n\n          <ion-icon name="body" item-start></ion-icon> Activate presence notifications</ion-label>\n\n        <ion-toggle [(ngModel)]="presenceNotification" (click)=\'setPresenceMode()\'></ion-toggle>\n\n      </ion-item>\n\n  \n\n      <ion-card-content>\n\n          If you want to receive a notification when a presence is detected, activate it here.\n\n      </ion-card-content>\n\n  \n\n    </ion-card>\n\n  \n\n  </ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-presence\settings-presence.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_settings_settings__["a" /* SettingsProvider */]])
    ], SettingsPresencePage);
    return SettingsPresencePage;
}());

//# sourceMappingURL=settings-presence.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__change_informations_change_informations__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsAccountPage = (function () {
    function SettingsAccountPage(navCtrl, navParams, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.userCredentials = { username: '', wealarid: '', userphone: '' };
    }
    SettingsAccountPage.prototype.ionViewWillEnter = function () {
        var info = this.auth.getUserInfo();
        this.userCredentials.username = info['username'];
        this.userCredentials.userphone = info['phone'];
        this.userCredentials.wealarid = info['wealarid'];
    };
    SettingsAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsAccountPage');
    };
    SettingsAccountPage.prototype.goToChangeInformations = function () {
        console.log("Go to Change information");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__change_informations_change_informations__["a" /* ChangeInformationsPage */]);
    };
    SettingsAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-settings-account',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-account\settings-account.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    <ion-title>Account</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page">\n\n  <ion-card>\n\n\n\n    <ion-card-header>\n\n      <strong>Account Informations</strong>\n\n    </ion-card-header>\n\n\n\n    <br>\n\n\n\n    <ion-list class=\'list\'>\n\n\n\n      <div>\n\n        <strong>WEALAR_ID:</strong> {{userCredentials.wealarid}}\n\n      </div>\n\n\n\n      <br>\n\n\n\n      <div>\n\n        <strong>USERNAME:</strong> {{userCredentials.username}}\n\n      </div>\n\n      \n\n      <br>\n\n\n\n      <div>\n\n        <strong>PHONE:</strong> {{userCredentials.userphone}}\n\n      </div>\n\n\n\n      <br>\n\n\n\n    </ion-list>\n\n\n\n  </ion-card>\n\n\n\n  <ion-card>\n\n\n\n    <ion-list>\n\n\n\n      <button ion-item (click)=\'goToChangeInformations()\'>\n\n        <ion-icon name="contact" item-start></ion-icon>\n\n        Change informations\n\n      </button>\n\n\n\n    </ion-list>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\settings-account\settings-account.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], SettingsAccountPage);
    return SettingsAccountPage;
}());

//# sourceMappingURL=settings-account.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeInformationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChangeInformationsPage = (function () {
    function ChangeInformationsPage(navCtrl, auth, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.changeSuccess = false;
        this.userCredentials = { username: '', userphone: '' };
        var info = this.auth.getUserInfo();
        this.userCredentials.username = info['username'];
        this.userCredentials.userphone = info['phone'];
    }
    ChangeInformationsPage.prototype.changeInformations = function () {
        var _this = this;
        this.showLoading("Connexion");
        this.auth.changeInformation(this.userCredentials).subscribe(function (success) {
            if (success) {
                _this.changeSuccess = true;
                _this.showPopup("Success", "Informations changed.");
            }
            else {
                _this.showPopup("Error", "Problem change informations.");
            }
        }, function (error) {
            _this.showPopup("Error", error);
        });
    };
    ChangeInformationsPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ChangeInformationsPage.prototype.showPopup = function (title, text) {
        var _this = this;
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        if (_this.changeSuccess) {
                            _this.navCtrl.pop();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    ChangeInformationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-informations',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\change-informations\change-informations.html"*/'<ion-header>\n\n    <ion-navbar color="dark">\n\n      <ion-title>Change Informations</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n   \n\n  <ion-content class="login-content" padding>\n\n    <div class="login-box">\n\n      \n\n      <form (ngSubmit)="changeInformations()" #registerForm="ngForm">\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-list inset>\n\n              \n\n              <ion-item>\n\n                <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="userCredentials.username" required></ion-input>\n\n              </ion-item>\n\n              \n\n              <ion-item>\n\n                <ion-input type="text" placeholder="Phone Number" name="phone" [(ngModel)]="userCredentials.userphone" required></ion-input>\n\n              </ion-item>\n\n              \n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n        \n\n        <ion-row>\n\n          <ion-col class="signup-col">\n\n            <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Change</button>\n\n          </ion-col>\n\n        </ion-row>\n\n        \n\n      </form>\n\n    </div>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\change-informations\change-informations.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ChangeInformationsPage);
    return ChangeInformationsPage;
}());

//# sourceMappingURL=change-informations.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChangePasswordPage = (function () {
    function ChangePasswordPage(nav, auth, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.passwordCredentials = { oldpassword: '', password: '', confirm_password: '' };
    }
    ChangePasswordPage.prototype.changePassword = function () {
        var _this = this;
        if (this.passwordCredentials.password == this.passwordCredentials.confirm_password) {
            this.showLoading('Changing password');
            this.auth.changePassword(this.passwordCredentials).subscribe(function (allowed) {
                if (allowed) {
                    _this.showError("Success", "Password changed.");
                    _this.passwordCredentials = { oldpassword: '', password: '', confirm_password: '' };
                    _this.nav.pop();
                }
                else {
                    _this.showError("Fail", "Incorrect password");
                    _this.passwordCredentials = { oldpassword: '', password: '', confirm_password: '' };
                }
            }, function (error) {
                _this.showError("Fail", error);
            });
        }
        else {
            this.showError("Fail", "Passwords are not the same.");
        }
    };
    ChangePasswordPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ChangePasswordPage.prototype.showError = function (status, text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: status,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\change-password\change-password.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="login-content" padding>\n\n  <div class="login-box">\n\n\n\n    <form (ngSubmit)="changePassword()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Old Password" name="oldpassword" [(ngModel)]="passwordCredentials.oldpassword" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="passwordCredentials.password" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Confirm Password" name="confirm_password" [(ngModel)]="passwordCredentials.confirm_password"\n\n                required></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Change</button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\change-password\change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstconnectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__first_co_change_info_first_co_change_info__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//Template : https://github.com/ionic-team/ionic-preview-app/tree/master/src/pages/slides/basic
var FirstconnectionPage = (function () {
    function FirstconnectionPage(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
        this.slides = [
            {
                title: "Welcome to the WEALAR APP!",
                description: "There is your dashboard to remote your wealar system.",
                image: "assets/imgs/app.png",
            },
            {
                title: "What is Wealar?",
                description: "<b>Wealar</b> is a remote connected alarm with a weather station which can allow you to get informations of your home",
                image: "assets/imgs/logo_transparent.png",
            },
            {
                title: "What is Wealar app?",
                description: "The <b>wealar application</b> - Powered by Ionic framework - will allow you to remote your wealar alarm anywhere and whenever you want.",
                image: "assets/imgs/ionic-logo.png",
            }
        ];
    }
    FirstconnectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FirstconnectionPage');
    };
    FirstconnectionPage.prototype.goTofirstCoInfo = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__first_co_change_info_first_co_change_info__["a" /* FirstCoChangeInfoPage */]);
    };
    FirstconnectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-firstconnection',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\firstconnection\firstconnection.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>WELCOME</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="firstconnection">\n\n\n\n  <ion-slides pager>\n\n    <ion-slide *ngFor="let slide of slides">\n\n      <ion-toolbar>\n\n      </ion-toolbar>\n\n      <img [src]="slide.image" class="slide-image"/>\n\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n\n      <p [innerHTML]="slide.description"></p>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <ion-toolbar>\n\n      </ion-toolbar>\n\n      <img src="assets/imgs/get-started.png" class="slide-image"/>\n\n      <h2 class="slide-title">Ready to Start?</h2>\n\n      <p>But firts you just need to set your personal informations ;)</p>\n\n      <button ion-button large clear icon-end color="light" (click)=\'goTofirstCoInfo()\'>\n\n        Continue\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\firstconnection\firstconnection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], FirstconnectionPage);
    return FirstconnectionPage;
}());

//# sourceMappingURL=firstconnection.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstCoChangeInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirstCoChangeInfoPage = (function () {
    function FirstCoChangeInfoPage(nav, auth, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.Credentials = { username: '', password: '', confirm_password: '', userphone: '' };
    }
    FirstCoChangeInfoPage.prototype.firstConnection = function () {
        var _this = this;
        if (this.Credentials.password == this.Credentials.confirm_password) {
            this.showLoading('Changing informations');
            this.auth.firstCo(this.Credentials).subscribe(function (allowed) {
                if (allowed) {
                    _this.showError("Success", "Informations changed.");
                    _this.Credentials = { username: '', password: '', confirm_password: '', userphone: '' };
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    _this.showError("Fail", "Unknown Error");
                    _this.Credentials = { username: '', password: '', confirm_password: '', userphone: '' };
                }
            }, function (error) {
                _this.showError("Fail", error);
            });
        }
        else {
            this.showError("Fail", "Passwords are not the same.");
        }
    };
    FirstCoChangeInfoPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    FirstCoChangeInfoPage.prototype.showError = function (status, text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: status,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    FirstCoChangeInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-first-co-change-info',template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\first-co-change-info\first-co-change-info.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>Change information</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content" padding>\n  <div class="login-box">\n\n    <form (ngSubmit)="firstConnection()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="Credentials.username" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="text" placeholder="Phone Number" name="phonenumber" [(ngModel)]="Credentials.userphone" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="Credentials.password" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Confirm Password" name="confirm_password" [(ngModel)]="Credentials.confirm_password"\n                required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Change</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\pages\first-co-change-info\first-co-change-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], FirstCoChangeInfoPage);
    return FirstCoChangeInfoPage;
}());

//# sourceMappingURL=first-co-change-info.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(269);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_alarm_alarm__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_sensibility_settings_sensibility__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_sms_settings_sms__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_weather_settings_weather__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_settings_presence_settings_presence__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_account_settings_account__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_change_informations_change_informations__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_data_data__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_storage__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_settings_settings__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_firstconnection_firstconnection__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_first_co_change_info_first_co_change_info__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_alarm_alarm__["a" /* AlarmPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_sensibility_settings_sensibility__["a" /* SettingsSensibilityPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_sms_settings_sms__["a" /* SettingsSmsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_weather_settings_weather__["a" /* SettingsWeatherPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_settings_presence_settings_presence__["a" /* SettingsPresencePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_account_settings_account__["a" /* SettingsAccountPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_change_informations_change_informations__["a" /* ChangeInformationsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_firstconnection_firstconnection__["a" /* FirstconnectionPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_first_co_change_info_first_co_change_info__["a" /* FirstCoChangeInfoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_alarm_alarm__["a" /* AlarmPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_sensibility_settings_sensibility__["a" /* SettingsSensibilityPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_sms_settings_sms__["a" /* SettingsSmsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_weather_settings_weather__["a" /* SettingsWeatherPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_settings_presence_settings_presence__["a" /* SettingsPresencePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_account_settings_account__["a" /* SettingsAccountPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_change_informations_change_informations__["a" /* ChangeInformationsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_firstconnection_firstconnection__["a" /* FirstconnectionPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_first_co_change_info_first_co_change_info__["a" /* FirstCoChangeInfoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_data_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_settings_settings__["a" /* SettingsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

var MyApp = (function () {
    function MyApp(platform /*, statusBar: StatusBar, splashScreen: SplashScreen*/) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();
            //splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Lucien\Documents\Cours\projet\WealarApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] /*, statusBar: StatusBar, splashScreen: SplashScreen*/])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_data__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var User = (function () {
    function User(username, wealarid, phone) {
        this.username = username;
        this.wealarid = wealarid;
        this.phone = phone;
    }
    User.prototype.set = function (username, wealarid, phone) {
        this.username = username;
        this.wealarid = wealarid;
        this.phone = phone;
    };
    return User;
}());

var AuthServiceProvider = (function () {
    function AuthServiceProvider(http, settingsProvider, dataProvider) {
        this.http = http;
        this.settingsProvider = settingsProvider;
        this.dataProvider = dataProvider;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            })
        };
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
                var httpParams = {
                    username: credentials.username,
                    password: credentials.password
                };
                _this.http.post("https://wealarapi.herokuapp.com/public/login", httpParams, _this.httpOptions)
                    .subscribe(function (val) {
                    _this.httpOptions.headers = _this.httpOptions.headers.set('Authorization', 'Bearer ' + val.data.Token);
                    _this.settingsProvider.setHeader(_this.httpOptions);
                    _this.dataProvider.setHeader(_this.httpOptions);
                    _this.currentUser = new User(val.data.UserName, val.data.WEALARID, val.data.Phone);
                    _this.password = credentials.password;
                    _this.settingsProvider.setPresenceMode(val.data.Preferences.presenceNotification);
                    _this.settingsProvider.setSmsMode(val.data.Preferences.smsNotification);
                    _this.settingsProvider.setWeatherMode(val.data.Preferences.weatherNotification);
                    _this.settingsProvider.setMode(val.data.Preferences.securityMode);
                    console.log("Settings Provider MODE", _this.settingsProvider.activemode);
                    var access = (val.data.Token != null);
                    observer.next(access);
                    observer.complete();
                    console.log("POST call successful value returned in body", val);
                    console.log("current user", _this.currentUser);
                }, function (response) {
                    console.log("POST call in error", response);
                    var access = false;
                    observer.next(access);
                }, function () {
                    console.log("The POST observable is now completed.");
                    observer.complete();
                });
            });
        }
    };
    AuthServiceProvider.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.changeInformation = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var httpParams = {
                username: credentials.username,
                phone: credentials.userphone
            };
            _this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/userinfos", httpParams, _this.httpOptions)
                .subscribe(function (val) {
                _this.currentUser.set(credentials.username, _this.currentUser.wealarid, credentials.userphone);
                observer.next(true);
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                console.log("POST call in error", response);
                observer.next(false);
            }, function () {
                console.log("The POST observable is now completed.");
                observer.complete();
            });
        });
    };
    AuthServiceProvider.prototype.firstCo = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var httpParams = {
                username: credentials.username,
                phone: credentials.userphone,
                oldPassword: _this.password,
                newPassword: credentials.password
            };
            _this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/firstco", httpParams, _this.httpOptions)
                .subscribe(function (val) {
                _this.currentUser.set(credentials.username, _this.currentUser.wealarid, credentials.userphone);
                observer.next(true);
                _this.password = '';
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                console.log("POST call in error", response);
                console.log("Credentials", httpParams);
                observer.next(false);
            }, function () {
                console.log("The POST observable is now completed.");
                observer.complete();
            });
        });
    };
    AuthServiceProvider.prototype.changePassword = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var httpParams = {
                oldPassword: credentials.oldpassword,
                newPassword: credentials.password
            };
            _this.http.put("https://wealarapi.herokuapp.com/common/user/change/password", httpParams, _this.httpOptions)
                .subscribe(function (val) {
                observer.next(true);
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                console.log('Parameters', httpParams);
                console.log("POST call in error", response);
                observer.next(false);
            }, function () {
                console.log("The POST observable is now completed.");
                observer.complete();
            });
        });
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            _this.http.delete("https://wealarapi.herokuapp.com/common/logout", _this.httpOptions)
                .subscribe(function (val) {
                _this.currentUser = null;
                observer.next(true);
                console.log("POST call successful value returned in body", val);
                console.log("current user", _this.currentUser);
            }, function (response) {
                console.log("POST call in error", response);
                _this.currentUser = null;
                observer.next(true);
            }, function () {
                console.log("The POST observable is now completed.");
                observer.complete();
            });
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0__settings_settings__["a" /* SettingsProvider */], __WEBPACK_IMPORTED_MODULE_5__data_data__["a" /* DataProvider */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsProvider = (function () {
    function SettingsProvider(http) {
        this.http = http;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            })
        };
    }
    SettingsProvider.prototype.setHeader = function (header) {
        this.httpOptions = header;
        console.log("Header settingsProvider", this.httpOptions);
    };
    //Sensibility
    SettingsProvider.prototype.getMode = function () {
        return this.activemode;
    };
    SettingsProvider.prototype.setMode = function (activemode) {
        return this.activemode = activemode;
    };
    SettingsProvider.prototype.changeMode = function (mode) {
        if (mode == "LOW") {
            return this.activemode = 0;
        }
        if (mode == "MEDIUM") {
            return this.activemode = 1;
        }
        if (mode == "HIGH") {
            return this.activemode = 2;
        }
    };
    //Notification
    //sms
    SettingsProvider.prototype.getSmsMode = function () {
        return this.smsNotification;
    };
    SettingsProvider.prototype.setSmsMode = function (state) {
        console.log('SmsMode State', state);
        this.smsNotification = state;
    };
    //presence
    SettingsProvider.prototype.getPresenceMode = function () {
        return this.presenceNotification;
    };
    SettingsProvider.prototype.setPresenceMode = function (state) {
        console.log('PresenceMode State', state);
        this.presenceNotification = state;
    };
    //weather
    SettingsProvider.prototype.getWeatherMode = function () {
        return this.weatherNotification;
    };
    SettingsProvider.prototype.setWeatherMode = function (state) {
        console.log('weather State', state);
        this.weatherNotification = state;
    };
    SettingsProvider.prototype.setNotificationMode = function (security, sms, weather, presence) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            var httpParams = {
                securityMode: security,
                smsNotification: sms,
                weatherNotification: weather,
                presenceNotification: presence
            };
            _this.http.put("https://wealarapi.herokuapp.com/common/user/change/infos/preferences", httpParams, _this.httpOptions)
                .subscribe(function (val) {
                _this.weatherNotification = weather;
                _this.smsNotification = sms;
                _this.activemode = security;
                _this.presenceNotification = presence;
                observer.next(true);
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                console.log("POST call in error", response);
                observer.next(false);
            }, function () {
                console.log("The POST observable is now completed.");
                observer.complete();
            });
        });
    };
    SettingsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], SettingsProvider);
    return SettingsProvider;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = (function () {
    function DataProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            })
        };
        console.log('Hello DataProvider Provider');
        this.weatherData = [];
        this.alarmData = [];
    }
    DataProvider.prototype.setHeader = function (header) {
        this.httpOptions = header;
        console.log("Header dataProvider", this.httpOptions);
    };
    DataProvider.prototype.getWeatherList = function () {
        var _this = this;
        if (this.weatherData.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(this.storage.get("weatherData")).mergeMap(function (val) {
                if (val == null || val.weather == null) {
                    return _this.http.get("assets/json/weather.json").pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["tap"])(function (res) {
                        _this.weatherData = res.weather;
                    }));
                }
                else {
                    _this.weatherData = val.weather;
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ weather: _this.weatherData });
                }
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ weather: this.weatherData });
        }
    };
    DataProvider.prototype.getAlarmData = function () {
        var _this = this;
        if (this.alarmData.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(this.storage.get("alarmData")).mergeMap(function (val) {
                if (val == null || val.alarm == null) {
                    return _this.http.get("assets/json/alarm.json").pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["tap"])(function (res) {
                        _this.alarmData = res.alarm;
                    }));
                }
                else {
                    _this.alarmData = val.alarm;
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ alarm: _this.alarmData });
                }
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ alarm: this.alarmData });
        }
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ })

},[259]);
//# sourceMappingURL=main.js.map