import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../../services/loader.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private subscribeUrl : string = 'app_addmember';

  constructor(
    private http: HttpService,
    public loader: LoaderService,
  ) { }

  subscribe(formdata: any) {
    this.loader.showLoader();
    return this.http.POST(this.subscribeUrl, formdata).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      })
    )
  }
}
