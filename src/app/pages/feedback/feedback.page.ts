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
  public reason: any;
  public title: any = '';
  public feedback_type: any = 'general';


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
    if(this.feedback_type == 'general') {
      formdata.append("name", this.name);
      formdata.append("email", this.email);
      formdata.append("mobile", this.phone);
      formdata.append("type", this.feedback_type);
      formdata.append("feedback", this.feedback);
    } else {
      formdata.append("name", this.name);
      formdata.append("email", this.email);
      formdata.append("mobile", this.phone);
      formdata.append("type", this.feedback_type);
      formdata.append("feedback", this.reason);
    }
    this.http.sendFeedback(formdata).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.feedback = '';
        this.reason = '';

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
