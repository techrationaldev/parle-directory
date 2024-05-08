import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl: string = 'app_getnotification';
  
  constructor(
    private http: HttpService,
    public loader: LoaderService,
  ) { }


  getNotification() {
    this.loader.showLoader();
    let reqFormData = new FormData();
      return this.http.POST(this.notificationUrl, reqFormData).pipe(
        map((response: any) => {
          this.loader.hideLoader();
          return response;
        }),
      );
  }
}
