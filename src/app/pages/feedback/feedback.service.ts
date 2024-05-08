import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private sendfeedbackUrl : string = 'app_sendfeedback';

  constructor(
    public loader: LoaderService,
    public http: HttpService
  ) { }
  
  sendFeedback(formdata: any) {
    this.loader.showLoader();
    return this.http.POST(this.sendfeedbackUrl, formdata).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      })
    )
  }
}
