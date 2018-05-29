import { Component } from '@angular/core';

import { AlarmPage } from '../alarm/alarm';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = HomePage;
  tab2Root = AlarmPage;
  tab4Root = SettingsPage;

  constructor() {

  }

}