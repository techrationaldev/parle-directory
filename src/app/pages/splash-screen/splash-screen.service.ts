import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  private splashImgUrl :  any = 'app_getsplashscreen'; 

  constructor(
    private http: HttpService,
    public loader: LoaderService,
  ) { }


  getSplashScreen() {
    var formdata = new FormData();
    return this.http.POSTWithoutToken(this.splashImgUrl, formdata).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
