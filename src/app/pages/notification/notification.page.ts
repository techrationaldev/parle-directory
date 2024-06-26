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
  public title: any = '';
  public isLoading: boolean = false;

  constructor(
    public globalVar: GlobalVarService,
    public http: NotificationService
  ) { }

  ngOnInit() {
    this.fnGetNotification();
  }

   
  doRefresh(refresher: any) {
    if (refresher != '') {
      setTimeout(() => {
          this.notificationList = [];
          refresher.target.complete();
          this.fnGetNotification();  
       
      }, 800);
    }
  }

  fnGetNotification() {
    this.isLoading = true;
    this.http.getNotification().subscribe((response: any) => {
      this.isLoading = false;
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
      this.isLoading = false;
    })
  }


}
