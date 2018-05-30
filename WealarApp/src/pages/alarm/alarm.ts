import { Component } from '@angular/core';
import { AlertController, Refresher } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage {
  alarmInfo: any;

  constructor(public alertCtrl: AlertController, public dataProvider: DataProvider) {
    this.dataProvider.getAlarmData().subscribe(data => {
      this.alarmInfo = this.dataProvider.alarmData;
      console.log('alarmInfo',this.alarmInfo);
    });
  }

  doDeactivate() {//if click on alarm deactive
    let alert = this.alertCtrl.create({
      title: 'Your alarm is deactivated',
      message: 'Becareful WEALAR has stopped watching your home !',
      buttons: ['OK']
    });
    alert.present();
  }

  doActivate() {//if click on alarm active
    let alert = this.alertCtrl.create({
      title: 'Your alarm is activated',
      message: 'WEALAR is now watching your home !',
      buttons: ['OK']
    });
    alert.present();
  }

  ignorePresence(){
    this.dataProvider.ignorePresence().subscribe(allowed => {//call a function of dataProvider which is an observable
      if (allowed) {
        console.log("Presence ignored");
        let alert = this.alertCtrl.create({
          title: 'ATTENTION !',
          message: 'The alerte will be ignored.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        console.log("Erreur Presence ignored");
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Unknown error',
          buttons: ['OK']
        });
        alert.present();
      }
    },
      error => {
        console.log("Erreur", error);
      });
  }

  doRefresh(refresher: Refresher) {//take the pull down for argument
    this.dataProvider.getAlarmData().subscribe(data => {//this is an observable we wait for the answer
      this.alarmInfo = this.dataProvider.alarmData;
      console.log('alarmeInfo',this.alarmInfo);
      
      console.log('DOREFRESH', refresher);
      refresher.complete();
    });
  }
}

