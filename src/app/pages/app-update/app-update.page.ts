import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalVarService } from 'src/app/services/global-var.service';


declare let cordova: any;

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.page.html',
  styleUrls: ['./app-update.page.scss'],
})
export class AppUpdatePage implements OnInit {

  constructor(
    public platform: Platform,
    public globalVar: GlobalVarService
  ) { }

  ngOnInit() {
  }

  fnAppUpdate() {
    if(this.platform.is('android')) {
      this.fnOpenStoreApp(this.globalVar.android_app_link);
    } else {
      this.fnOpenStoreApp(this.globalVar.ios_app_link);
    }
  }

  fnOpenStoreApp(link: any) {
    const options = 'location=yes,hidden=yes';
    cordova.InAppBrowser.open(link, '_blank', options);
  }

}
