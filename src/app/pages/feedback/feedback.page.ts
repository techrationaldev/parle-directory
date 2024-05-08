import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { FeedbackService } from './feedback.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  public name: any = '';
  public email: any = '';
  public phone: any = '';
  public feedback: any;
  public title: any = '';


  constructor(
    public toast: ToastService,
    public navCtrl: NavController,
    public globalVar: GlobalVarService,
    public http: FeedbackService
  ) { }

  ngOnInit() {
    this.fnGetSubscribeData();

    /* this.globalVar.getUpdatedIsSubscribe().subscribe((data) => {
      if(data == true) {
        this.fnGetSubscribeData();
      }
    }); */
  }

  fnGetSubscribeData() {
    if(this.globalVar.subscribeData) {
      this.name = this.globalVar.subscribeData.name;
      this.email = this.globalVar.subscribeData.email;
      this.phone = this.globalVar.subscribeData.mobile;
    }
  }


  fnSendFeedack() {
    let formdata = new FormData();
    formdata.append("name", this.name);
    formdata.append("email", this.email);
    formdata.append("mobile", this.phone);
    formdata.append("feedback", this.feedback);
    this.http.sendFeedback(formdata).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.feedback = '';

        this.navCtrl.pop();
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
