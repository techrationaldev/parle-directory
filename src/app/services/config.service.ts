import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private settingsUrl : string = 'app_getsetting';
  private deviceInfoUrl : string = 'app_adddevice_onsplash';
  // private deviceInfoUrl : string = 'app_adddevice';
  private getTokenUrl : string = 'app_gettoken';

  constructor(
    private http: HttpService,
    public loader: LoaderService,) { }

    getToken(reqFormData: any) {
      return this.http.POST(this.getTokenUrl, reqFormData).pipe(
        map((response: any) => {
          return response;
        })
      )
    }

    addDeviceFirstInfo(reqFormData: any) {
      return this.http.POSTWithoutToken(this.deviceInfoUrl, reqFormData).pipe(
        map((response: any) => {
          return response;
        })
      )
    }

    /* addDeviceInfo(reqFormData: any) {
      return this.http.POST(this.deviceInfoUrl, reqFormData).pipe(
        map((response: any) => {
          return response;
        })
      )
    } */

    getConfig() {
      let reqformdata = new FormData();
      return this.http.POST(this.settingsUrl, reqformdata).pipe(
        map((response: any) => {
          return response;
        }),
      );
    }
}
