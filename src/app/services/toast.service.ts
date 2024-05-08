import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async ToastShow(message: string) {
    let toast = await this.toastController.create({
      message: message,
      keyboardClose: true,
      color: 'primary',
      position: 'top',
      duration: 3000,
      buttons: [
        {
          icon: 'close-circle-outline',
          handler() {
              toast.dismiss();
          },
        }
      ]
    });
    return await toast.present();
  }
}
