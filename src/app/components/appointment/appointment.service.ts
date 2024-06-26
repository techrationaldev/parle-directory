import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private sendappointmentUrl : string = 'app_sendappointment';

  constructor(
    public loader: LoaderService,
    public http: HttpService
  ) { }
   
  sendAppointment(formdata: any) {
    this.loader.showLoader();
    return this.http.POST(this.sendappointmentUrl, formdata).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      })
    )
  }
}
