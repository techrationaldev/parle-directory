import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  public access_token: any = '';
  public isTokenApiErr: any = '';
  public settingData: any;
  public deviceId: any;
  public appId: any;
  public playerId: any;
  public successCode = 'SUCCESS';
  public tokenCode: any = 'TOKEN_EXPIRED';
  public errorCode: any = 'ERROR';
  public bannerImgUrl: any = '';
  public categoryImgUrl: any = '';
  public subcategoryImgUrl: any = '';
  public notificationImgUrl: any = '';
  public businessImgUrl: any = '';
  public appVersion: any = '';
  public show_biz_thumbnail: any;
  public android_app_link: any = '';
  public ios_app_link: any = '';
  public download_app_link: any = '';
  public subscribeData: any;
  public splashImg: any;
  public android_update : any = 0;
  public ios_update : any = 0;
  public get_android_version : any = 0;
  public get_ios_version : any = 0;

  public connection: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  public isSubscribe: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }



  getUpdatedIsSubscribe(): Observable<any> {
    return this.isSubscribe;
  }

  getUpdatedConnection(): Observable<any> {
    return this.connection;
  }
}
