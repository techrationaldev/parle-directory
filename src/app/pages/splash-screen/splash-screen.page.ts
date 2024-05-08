import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import Swiper from 'swiper';
import { Platform } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx'; 
import { GlobalVarService } from 'src/app/services/global-var.service';
import { GlobalFunService } from 'src/app/services/global-fun.service';
import { ConfigService } from 'src/app/services/config.service';

import { jwtDecode } from 'jwt-decode';
import { SplashScreenService } from './splash-screen.service';
import { SubscribeComponent } from 'src/app/components/subscribe/subscribe.component';
import { OnesignalService } from 'src/app/services/onesignal.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit, OnDestroy {
  
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  public splashImg: any

  constructor(
    public navCtrl: NavController,
    private device: Device,
    public modalCtrl: ModalController,
    private appVersion: AppVersion,
    public platform: Platform,
    public globalVar: GlobalVarService,
    public globalFun: GlobalFunService,
    public http: ConfigService,
    public onesignalService: OnesignalService,
    public httpService: SplashScreenService
  ) {
    
    this.initializeApp();
   }
  

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.globalVar.isSubscribe.value == true) {
      this.fnOpenSubscribe();
    }

    this.globalVar.getUpdatedIsSubscribe().subscribe((data) => {});
  }

  
  async fnOpenSubscribe() {
    let modal = await this.modalCtrl.create({
      component: SubscribeComponent,
      backdropDismiss: false
    });
    await modal.present();
  }


  fnSplashscreen() {
    this.httpService.getSplashScreen().subscribe((response: any) => {
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.splashImg = response.data.setting_value;
      }
    }, (err: any) => {
      console.log(err)
    })
  }



  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.fnGetAppVersion();
      } 
    })
  }

  fnGetAppVersion() {
    this.appVersion.getVersionNumber().then((response: any) => {
      this.globalVar.appVersion = response;
      this.fnAddDeviceInfo();
    }, (err: any) => {
    })
  }

  fnAddDeviceInfo() {
    let reqFormData = new FormData();
    reqFormData.append("device_uuid", this.device.uuid);
    reqFormData.append("device_platform", this.device.platform);
    reqFormData.append("device_model",  this.device.model);
    reqFormData.append("device_version", this.device.version);
    reqFormData.append("app_version", this.globalVar.appVersion);
    this.globalVar.deviceId = this.device.uuid;

    this.http.addDeviceFirstInfo(reqFormData).subscribe((response: any) => {
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.fnGetToken();

        
      }
    }, (err: any) =>{ 
      console.log(err)
    })
  }

  fnGetToken() {
    let reqFormData = new FormData();
    reqFormData.append('device_uuid', this.device.uuid);
    this.http.getToken(reqFormData).subscribe((response: any) => {
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.globalVar.access_token = response.access_token;
        localStorage.setItem('access_token', this.globalVar.access_token);

        this.fnJWTToken();
        this.fnGetSettings();
      }
    }, (err) => {
      console.log('err', err)
    })
  }

    
  async fnJWTToken() {
    let token = this.globalVar.access_token;
    if (!token) {
      token = await localStorage.getItem('access_token');
    }

    let subscribeData : any;
    subscribeData = jwtDecode(token);
    if (subscribeData) {
      localStorage.setItem('subscribeData', JSON.stringify(subscribeData));
      this.globalVar.subscribeData = subscribeData;
      
      if(subscribeData['name'] == '') {
        this.globalVar.isSubscribe.next(true);
      } else {
        this.globalVar.isSubscribe.next(false);
      }

      
      this.globalVar.getUpdatedIsSubscribe().subscribe((data) => {
        
      });
    }
  }

  fnGetSettings() {
    this.http.getConfig().subscribe(
      async (response: any) => {
        if ( response.status == true && response.code == this.globalVar.successCode) {

          this.globalVar.settingData = response.data;
          this.globalVar.bannerImgUrl = response.data.banner_image_dir_public;
          this.globalVar.categoryImgUrl = response.data.category_image_dir_public;
          this.globalVar.subcategoryImgUrl = response.data.subcategory_image_dir_public;
          this.globalVar.businessImgUrl = response.data.business_image_dir_public;
          this.globalVar.notificationImgUrl = response.data.notification_image_dir_public;
          this.globalVar.android_update = response.data.android_force_update;
          this.globalVar.ios_update = response.data.android_force_update;
          this.globalVar.get_android_version = response.data.android_version;
          this.globalVar.get_ios_version = response.data.ios_version;
          this.globalVar.android_app_link = response.data.android_app_link;
          this.globalVar.ios_app_link = response.data.ios_app_link;
          if(this.globalVar.settingData) {
            localStorage.setItem('settingData', JSON.stringify(this.globalVar.settingData));
          }

          if(this.platform.is('cordova')) {
            let playerId = await localStorage.getItem('parleDirectoryplayerId');
            if(!playerId) {
              this.onesignalService.OneSignalNotification();
            } else {
              this.onesignalService.fnOneSignalAfterKill();
            }
          }


          setTimeout(() => {
            // console.log('version >>', this.globalVar.appVersion);
            // console.log('app version >>', this.globalVar.get_android_version);
            if (this.platform.is('android') && this.globalVar.android_update === '1') {
              this.fnHandleVersionUpdate(this.globalVar.get_android_version);
            } else if (!this.platform.is('android') && this.globalVar.ios_update === '1') {
              this.fnHandleVersionUpdate(this.globalVar.get_ios_version);
            } else {
              this.navCtrl.navigateRoot('home');
            }
          }, 1000);
        } else {
          if (response.code == this.globalVar.tokenCode) {
            // ...
          }
        }
      },
      (err: any) => {
      }
    );
  }


  fnHandleVersionUpdate(get_version: any) {
    
    if(this.globalVar.appVersion != undefined && this.globalVar.appVersion != get_version) {
      this.navCtrl.navigateRoot('app-update');
    } else {
      this.navCtrl.navigateRoot('home');
    }
  }

  
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }
  
  swiperSlideChanged(e: any) {
    // console.log('changed: ', e);
  }

}
