import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx'; 
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx'; 
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { OneSignalPlugin } from 'onesignal-cordova-plugin';

// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    HttpClientModule,
    AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    // SplashScreen,
    StatusBar,
    OneSignalPlugin,
    SocialSharing,
    CallNumber,
    WebView,
    Device,
    AppVersion,
    PhotoViewer,
    EmailComposer,
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
