import { Injectable } from '@angular/core';

import { GlobalVarService } from './global-var.service';
import { ActionSheetController, AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

interface Navigator {
  app?: {
      exitApp?: () => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalFunService {

  constructor(
    public platform : Platform,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public router: Router,
    public globalVar: GlobalVarService
  ) { }


  
  // ============== Back button Event and Exit code alert ================================= //
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      // close modal
      /* try {
        const element = await this.modalCtrl.getTop();
        if (element != undefined) {
          element.dismiss();
          return;
        }
      } catch (error) {} */

      // close alert
      try {
        const element = await this.alertCtrl.getTop();
        if (element != undefined) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close actionsheet
      try {
        const element = await this.actionsheetCtrl.getTop();
        if (element != undefined) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      if (this.router.url === '/home' || this.router.url === '/app-update') {
        this.fntoexit();
      } else if(this.router.url === '/details' || this.router.url === '/settings' || this.router.url === '/videos' || this.router.url === '/about-us' || this.router.url === '/our-team' ||
      this.router.url === '/feedback' || this.router.url === '/privacy-policy' || this.router.url === '/disclaimer' || this.router.url === '/our-teams' || this.router.url === '/notification') {
        this.navCtrl.pop()
      } else {
        // this.navCtrl.pop();
        this.fntoexit();
      }
    });
  }

  async fntoexit() {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to exit?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: (any) => {
              // navigator['app'].exitApp();
              (navigator as any).app.exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
  // // ================================================================== //
}
