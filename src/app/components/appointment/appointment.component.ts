import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { AppointmentService } from './appointment.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent  implements OnInit {

  public appointmentForm: FormGroup;
  public email: any;
  public user_name: any = '';
  public user_email: any = '';
  public user_mobile: any = '';
  public currentDate = new Date().toISOString();
  public currentTime = new Date().toUTCString();
  public appointmentdate = new Date().toISOString();
  public appointmenttime = new Date().toUTCString();

  constructor(
    public toast: ToastService,
    public modalCtrl: ModalController,
    public globalVar: GlobalVarService,
    public navParams: NavParams,
    public http: AppointmentService,
    public fb: FormBuilder
  ) { 
    this.appointmentForm = this.fb.group({
      name: [this.user_name, Validators.required],
      email: [this.user_email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')])],
      mobile: [this.user_mobile, Validators.required],
      appointment_date: [this.appointmentdate, Validators.required],
      appointment_time: [this.appointmenttime, Validators.required],
      comments: ['', Validators.required]
    });

    this.email = this.navParams.get('email');
  }

  ngOnInit() {
    this.fnGetSubscribeData();
    this.setCurrentTime();
  }

    setCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); 
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');
  
      let datetime = `${year}-${month}-${day}T${hour}:${minute}`;
      this.currentTime = datetime;
    }

  fnGetSubscribeData() {
    if(this.globalVar.subscribeData) {
      this.user_name = this.globalVar.subscribeData.name;
      this.user_email = this.globalVar.subscribeData.email;
      this.user_mobile = this.globalVar.subscribeData.mobile;
    }
  }

  fnSendAppointment() {
    let formdata = new FormData();
      formdata.append("name", this.appointmentForm.value.name);
      formdata.append("email", this.appointmentForm.value.email);
      formdata.append("mobile", this.appointmentForm.value.mobile);
      formdata.append("appointment_date", this.appointmentdate.split('T')[0]);
      formdata.append("appointment_time", new Date(this.appointmenttime).toLocaleTimeString());
      formdata.append("comments", this.appointmentForm.value.comments);
      formdata.append("biz_email", this.email);
    
      this.http.sendAppointment(formdata).subscribe((response: any) => {
        if ( response.status == true && response.code == this.globalVar.successCode) {
          this.modalCtrl.dismiss();
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
