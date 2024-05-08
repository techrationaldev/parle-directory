import { Injectable } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';

import OneSignal from 'onesignal-cordova-plugin';

import { GlobalVarService } from './global-var.service';


@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public navCtrl:  NavController,
    private globalVar: GlobalVarService,
  ) { }

  async OneSignalNotification() {
    await this.platform.ready().then(async () => {
      // console.log('appId', this.globalVar.appId);
        // OneSignal.setAppId(this.globalVar.appId);
        OneSignal.setAppId('be441c98-0d47-4246-a3c3-648e60129592');
        this.GetFirstTimeOneSignalId();        
    });
  }


  async GetFirstTimeOneSignalId() {
    await this.platform.ready().then(async () => {
        // this.fnshowLoading();
        await OneSignal.addSubscriptionObserver(async (res) => {
        // console.log('first timedevice id>>', res);
          if (res.to.userId !== null) {
            OneSignal.getDeviceState((data) => {
              this.globalVar.playerId = data.userId;
              localStorage.setItem('parleDirectoryplayerId', this.globalVar.playerId);
              // console.log('player id>>', this.globalVar.playerId);
              // this.fnhideLoading();
              return data.userId;
            });

            await OneSignal.setNotificationOpenedHandler((msg: any) => {
              // let notification_obj = msg.notification.additionalData;
              // if (notification_obj) {
                  this.navCtrl.navigateForward('notification');
              // }
            });
          }
        });
    });
  }

  
  async fnOneSignalAfterKill() {
    await this.platform.ready().then(async () => {
      if (this.platform.is('cordova')) {
        OneSignal.setAppId(this.globalVar.appId);

        await OneSignal.addSubscriptionObserver(async (res) => {
          // console.log('second timedevice id>>', res);
            if (res.to.userId !== null) {
              OneSignal.getDeviceState((data) => {
                this.globalVar.playerId = data.userId;
                localStorage.setItem('parleDirectoryplayerId', this.globalVar.playerId);
                // console.log('2nd time ID=>'+ data.userId);
                return data.userId;
              });

              await OneSignal.setNotificationOpenedHandler((msg: any) => {
                // let notification_obj = msg.notification.additionalData;
                // if (notification_obj) {
                    this.navCtrl.navigateForward('notification');
                // }
              });
            }
          });

       
        
      }
    });
  }


 /*  async fnshowLoading() {
    await this.loadingCtrl.create({
      message: '',
      spinner: null,
      cssClass: 'loader',
    }).then((ldr: any) => {
      ldr.present()
    });
  }

  async fnhideLoading() {
    setTimeout(async () => {
      let topLoader = await this.loadingCtrl.getTop();
      while (topLoader) {
        if (!(await topLoader.dismiss())) {
          await topLoader.dismiss();
          break;
        }
        topLoader = await this.loadingCtrl.getTop();
      }
    }, 1000);
  } */

}
