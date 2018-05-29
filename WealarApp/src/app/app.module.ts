import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AlarmPage } from '../pages/alarm/alarm';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsSensibilityPage } from '../pages/settings-sensibility/settings-sensibility';
import { SettingsSmsPage } from '../pages/settings-sms/settings-sms';
import { SettingsWeatherPage } from '../pages/settings-weather/settings-weather';
import { SettingsPresencePage } from '../pages/settings-presence/settings-presence';
import { SettingsAccountPage } from '../pages/settings-account/settings-account';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ChangeInformationsPage } from '../pages/change-informations/change-informations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';
import { SettingsProvider } from '../providers/settings/settings';
import { FirstconnectionPage } from '../pages/firstconnection/firstconnection';
import { FirstCoChangeInfoPage } from '../pages/first-co-change-info/first-co-change-info';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlarmPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    SettingsSensibilityPage,
    SettingsSmsPage,
    SettingsWeatherPage,
    SettingsPresencePage,
    SettingsAccountPage,
    ChangePasswordPage,
    ChangeInformationsPage,
    FirstconnectionPage,
    FirstCoChangeInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    AlarmPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    SettingsSensibilityPage,
    SettingsSmsPage,
    SettingsWeatherPage,
    SettingsPresencePage,
    SettingsAccountPage,
    ChangePasswordPage,
    ChangeInformationsPage,
    FirstconnectionPage,
    FirstCoChangeInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DataProvider,
    SettingsProvider
  ]
})
export class AppModule {}
