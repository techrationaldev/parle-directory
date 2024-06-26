import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from './details.service';
import { GlobalVarService } from 'src/app/services/global-var.service';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { WatchVideoComponent } from 'src/app/components/watch-video/watch-video.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { AppointmentComponent } from 'src/app/components/appointment/appointment.component';



declare let cordova: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public businessList: Array<any> = [];
  public businessTempList: Array<any> = [];
  public adBannerList: Array<any> = [];
  public subcatData: any;
  public isSearch: boolean = false;
  public isLoading: boolean = false;
  public globSearchText: any = '';
  public search_text: any = '';
  public title: string = '';
  


  constructor(
    public platform: Platform,
    public callnumber: CallNumber,
    private socialSharing: SocialSharing,
    public photoviewer: PhotoViewer,
    public email: EmailComposer,
    public iab: InAppBrowser,
    public router: Router,
    public modalCtrl: ModalController,
    public http: DetailsService,
    public globalVar: GlobalVarService,
    public route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state) {
          const state = this.router.getCurrentNavigation()?.extras.state;
          this.subcatData = state?.['sub_cat'];
          this.isSearch = state?.['is_search'];
          this.globSearchText = state?.['search_keyword'];
      }
    })
   }

  ngOnInit() {
    this.fnGetAdBannerList();
    if(this.isSearch == false) {
      this.fnGetBusinessList();
    } else {
        this.fnSearchData(0, this.globSearchText);
    }
  }

  doRefresh(refresher: any) {
    if (refresher != '') {
      setTimeout(() => {
        if(this.isSearch == false) {
          if (!this.search_text) {
            this.search_text = '';
          }
          this.businessList = [];
          refresher.target.complete();
          this.fnGetBusinessList();  
        } else {

          this.businessList = [];
          refresher.target.complete();
          this.fnSearchData(0, this.globSearchText);
        }  
      }, 800);
    }
  }

  // fnImageClick(item: any, data: any) {
  //   if(data == '') {
  //     this.fnDisplayVideo(item);
  //   } else {
  //     this.fnImagePreview(item);
  //   }
  // }

  fnImagePreview(item: any) {
    if(item.biz_image && item.is_premium == '1') {
      this.photoviewer.show(this.globalVar.businessImgUrl + item.biz_image, item.biz_title);
    }
  }

  async fnAppointment(biz: any) {
    let modal = await this.modalCtrl.create({
      component: AppointmentComponent,
      id: 'ap-modal',
      cssClass: 'ap-modal',
      componentProps: {email : biz.biz_email}
    });

    await modal.present();
  }

  async fnDisplayVideo(data: any) {
    let modal = await this.modalCtrl.create({
      component: WatchVideoComponent,
      id: 'video-modal',
      cssClass: 'business-video',
      componentProps: {link : data.biz_long}
    });
    await modal.present();
  }

  
  fnonSearch(event: any) {
    if (event.key == 'Enter') {
    this.businessList = [];
      this.fnSearchData(this.subcatData.subcat_id, this.search_text);
    }
    if (this.search_text == '') {
    this.businessList = [];
    this.fnGetBusinessList();
      return;
    }
  }

  fnOnCancel() {
    this.search_text = '';
    this.businessList = [];
    this.fnGetBusinessList();
  }

  fnGetAdBannerList() {
    this.isLoading = true;
      let reqFormData = new FormData();
      reqFormData.append("banner_type", "Sub Category");
      reqFormData.append("reference_id", this.subcatData.subcat_id);
      this.http.getAdBanner(reqFormData).subscribe((response: any) => {
        this.isLoading = false;
        if(response.status == true && response.code == this.globalVar.successCode) {
          this.adBannerList = response.data;
         
        } else {
          if (response.code == this.globalVar.tokenCode) {
            // ...
          }
        }
      }, (err) => {
        this.isLoading = false;
        console.log('err', err)
      })
  }

  fnSocialShare(item: any) {
    let maplink = item.biz_lat != '' ? `View On Map (${item?.biz_lat})` : '';
    let email = item.biz_email != '' ? `📧 Email: ${item?.biz_email}` : '';
    let website = item.biz_website != '' ? `🌐 Website: ${item?.biz_website}` : '';
    let download_link = this.globalVar.download_app_link != '' ? `Download App: ${this.globalVar.download_app_link}` : '';
    const message = 
    `🌟 Discover ${item.biz_title} with Parle Directory App! 🌟
    
    ${item.biz_title}
    📍 ${item.biz_address}
    ${maplink}
    
    📞 Phone: ${item?.biz_primary_phone}
    ${email}
    ${website}
    
    
    Discover the Parle Directory App! The ultimate resource for businesses and professionals in and around Vile Parle. 
    ${download_link}`;
    /* const message = 
    `🌟 Discover ${item.biz_title} with Parle Directory App! 🌟
    
    Hey there! 👋 Check out this amazing business listing:

    📍 ${item.biz_address}
    ${maplink}
    
    📞 Phone: ${item?.biz_primary_phone}
    ${email}
    ${website}
    
    
    📲 Discover the Parle Directory App! The ultimate resource for businesses and professionals in and around Vile Parle. 
    ${download_link}`; */
    var options = {
      message: message, 
      subject: item.biz_title, 
      chooserTitle: 'Pick an app',
    };
    
    this.socialSharing.shareWithOptions(options).then((result) => {
    }, (err) => {
    });
  }

  fnSearchData(subcatId: any, keyword: any) {
    this.isLoading = true;
    let reqFormData = new FormData();
    reqFormData.append("subcat_id",subcatId);
    reqFormData.append("keyword", keyword);
    this.http.search(reqFormData).subscribe((response: any) => {
      this.isLoading = false;
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.businessList = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      this.isLoading = false;
      console.log('err', err)
    })
  }

  fnGetBusinessList() {
    this.isLoading = true;
    let reqFormData = new FormData();
    reqFormData.append('subcat_id', this.subcatData.subcat_id)
    this.http.getBusiness(reqFormData).subscribe((response: any) => {
      this.isLoading = false;
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.businessList = response.data;
        this.businessTempList = this.businessList;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      this.isLoading = false;
      console.log('err', err)
    })
  }

  fnOpenBannerLink(data: any) {
    if(data.banner_link) {
      const options = 'location=yes,hidden=yes';
      cordova.InAppBrowser.open(data.banner_link, '_system', options);
    } else {
      let img = this.globalVar.bannerImgUrl + data.banner_image;
      this.photoviewer.show(img, '');
    }
  }

  fnViewOnMap(data: any) {
    const options = 'location=yes,hidden=yes';
    let link;
    if(data.biz_lat) {
      link = data.biz_lat;
    } else {
      link = 'https://www.google.com/maps/search/' + encodeURIComponent(data.biz_address);
    }
    cordova.InAppBrowser.open(link, '_system', options);
  }

  fnCallNumber(phn: any) {
    if(this.platform.is('android')) {
      const telUrl = 'tel:' + phn;
      console.log('phn', telUrl);
      const options = 'location=yes,hidden=yes';
      cordova.InAppBrowser.open(telUrl, '_system', options);
    } else {
      this.callnumber.callNumber(phn, true).then((res)=> {
        console.log('res', res);
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }

  fnOpenEmail(mail: any) {
    this.email.open({
      to:  mail,
    }).then(res => {
    }).catch(err => {
      console.log('err', err);
    })
  }

  fnOpenPremiumWebsite(item: any) {
    if(item.biz_website != '' && item.is_premium == '1') {
      this.fnOpenWebsite(item.biz_website);
    }
  }

  fnOpenWebsite(website: any) {
    const options = 'location=yes,hidden=yes';
    const link = website;
    cordova.InAppBrowser.open(link, '_system', options);
  }
}
