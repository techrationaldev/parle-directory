import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubscribeService } from './subscribe.service';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

  public name: any;
  public email: any;
  public phone: any;

  constructor(
    public toast: ToastService,
    public globalVar: GlobalVarService,
    public modalCtrl: ModalController,
    public http: SubscribeService
  ) { }

  ngOnInit() {}

  fnSubscribe() {
    let reqFormData = new FormData();
    reqFormData.append("device_uuid", this.globalVar.deviceId);
    reqFormData.append("name", this.name);
    reqFormData.append("email", this.email);
    reqFormData.append("mobile", this.phone);
    this.http.subscribe(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.modalCtrl.dismiss();
        this.globalVar.subscribeData.name = this.name;
        this.globalVar.subscribeData.email = this.email;
        this.globalVar.subscribeData.mobile = this.phone;
        

        this.toast.ToastShow(response.message);
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err: any) => {
    })
  }

}
