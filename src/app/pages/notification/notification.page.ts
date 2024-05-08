import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notificationList: Array<any> = [];

  constructor(
    public globalVar: GlobalVarService,
    public http: NotificationService
  ) { }

  ngOnInit() {
    this.fnGetNotification();
  }

  fnGetNotification() {
    this.http.getNotification().subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.notificationList = response.data;

        // if(!this.globalVar.notificationImgUrl) {
        //   localStorage.getItem('settingData')
        // }

      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err: any) => {
    })
  }


}
