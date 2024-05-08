import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';
import { GlobalVarService } from './services/global-var.service';
import { NavController, Platform } from '@ionic/angular';
 
import { GlobalFunService } from './services/global-fun.service';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreenService } from './pages/splash-screen/splash-screen.service';
import { OnesignalService } from './services/onesignal.service';
import { NetworkService } from './services/network.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    // public splash: SplashScreen,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public platform: Platform,
    public globalVar: GlobalVarService,
    public globalFun: GlobalFunService,
    public http: ConfigService,
    public networkService: NetworkService,
    public onesignalService: OnesignalService,
    public httpService: SplashScreenService
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.globalFun.backButtonEvent();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#FADF14');
      this.fnSplashscreen();
      this.networkService.fnInItNetwork();
      if(this.platform.is('cordova')) {
        // this.splash.hide();
      } else {
        this.globalVar.access_token  = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInVzZXJuYW1lIjoiaGVsbHlAZ21haWwuY29tIiwicGFzc3dkIjoiJDJ5JDEwJFVBWklZQWdXd2FqSUs3RlFjelVaVy4zMGdGWkRYVGJYZlhVTi51bFdaaWxtUUdkYkI1Mzl1IiwiZnVsbG5hbWUiOiJIZWxseSIsIkFQSV9USU1FIjoxNzA5OTAxNDMyfQ.ksHgocH9vab-TaCZhuvruGTqkkOLywCjWk4BG1_KYHg';
        this.fnGetSettings();
      }
    })
  }

  fnSplashscreen() {
    this.httpService.getSplashScreen().subscribe((response: any) => {
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.globalVar.splashImg = response.data.setting_value;
      }
    }, (err: any) => {
      console.log(err)
    })
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
          // this.globalVar.appId = response.data.onesignal_appid;
          if(this.globalVar.settingData) {
            localStorage.setItem('settingData', JSON.stringify(this.globalVar.settingData));
          }

          // if(this.platform.is('cordova') && this.globalVar.appId) {
         
          

          setTimeout(() => {
            this.navCtrl.navigateRoot('home');
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

}
