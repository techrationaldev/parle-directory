import { Component, OnInit, ViewChild,  } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalVarService } from 'src/app/services/global-var.service';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { HomeService } from './home.service';
import { NavigationExtras } from '@angular/router';

// used for slider
register();

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperContainer?: any;
  public swiper?: Swiper;
  animationInProgress = false;
  config = {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: true,
    loop: true,
  };
  autoslide = {
    delay: 2000, 
    disableOnInteraction: false, 
  };
  
  public categoryList: Array<any> = [];
  public subCategoryList: Array<any> = [];
  public bannertypeList: Array<any> = [];
  public sliderList: Array<any> = [];
  public homeFooterList: Array<any> = [];
  public footerSlider1List: Array<any> = [];
  public footerSlider2List: Array<any> = [];
  public footerSlider3List: Array<any> = [];
  public isLoading: boolean = false;
  public search_text: any = '';
  public title: string = '';


  constructor(
    public globalVar: GlobalVarService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public http: HomeService
  ) {
  
  }

  
  fnonSearch(event: any) {
    if (event.key == 'Enter') {
      this.fnSearchGlobal();
    }
    if (this.search_text == '') {
      return;
    }
  }

  fnOnCancel() {
    // this.search_text = '';
    this.fnSearchGlobal();
  }

  fnSearchGlobal() {
    let navExtra: NavigationExtras = {
      state: {
        sub_cat: '',
        search_keyword: this.search_text,
        is_search: true
      }
    }

    this.navCtrl.navigateForward('details', navExtra);

  }

  ngOnInit() {
    this.fnGetHomeSlider();
    this.fnGetHomeFooter();
    this.fnGetFooterSlider1();
    this.fnGetFooterSlider2();
    this.fnGetFooterSlider3();
    this.fnGetCategory();
  }

  
  async ionViewWillEnter() {
    this.search_text = '';
  }


  fnNotification() {
    this.navCtrl.navigateForward('notification');
  }

  fnSetting() {
    this.navCtrl.navigateForward('settings');
  }


  fnGetHomeSlider() {
    let reqFormData = new FormData();
    reqFormData.append("banner_type", "Home Slider");
    reqFormData.append("reference_id", "0");
    this.http.getHomeBanner(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.sliderList = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err: any) => {
    })
  }


  fnGetCategory() {
    this.http.getCategory().subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.categoryList = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err: any) => {
    })
  }

  fnSelectSubcategory(id: any) {
    this.isLoading = true;
    let reqFormData = new FormData();
    reqFormData.append("cat_id", id);
    this.http.getSubcategory(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.isLoading = false;
        this.subCategoryList = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err: any) => {
      this.isLoading = false;
    })
  }


  doRefresh(refresher: any) {
    if (refresher != '') {
      setTimeout(() => {
        if (!this.search_text) {
          this.search_text = '';
        }
        this.categoryList = [];
        this.subCategoryList = [];
        refresher.target.complete();
        this.fnGetCategory();      
      }, 800);
    }
  }

  
  fnGetMenuType() {
    if(this.globalVar.settingData) {
      this.bannertypeList = this.globalVar.settingData.banner_type.split(",");
    }
  }

  fnGetFooterSlider1() {
    let reqFormData = new FormData();
    reqFormData.append("banner_type", "Footer Slider 1");
    reqFormData.append("reference_id", "0");
    this.http.getHomeBanner(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.footerSlider1List = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      console.log('err', err)
    })
  }

  fnGetHomeFooter() {
    let reqFormData = new FormData();
    reqFormData.append("banner_type", "Home Footer");
    reqFormData.append("reference_id", "0");
    this.http.getHomeBanner(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.homeFooterList = response.data;
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      console.log('err', err)
    })
  }

  
  fnGetFooterSlider2() {
    let reqFormData = new FormData();
    reqFormData.append("banner_type", "Footer Slider 2");
    reqFormData.append("reference_id", "0");
    this.http.getHomeBanner(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.footerSlider2List = response.data;
        
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      console.log('err', err)
    })
  }
  
  fnGetFooterSlider3() {
    let reqFormData = new FormData();
    reqFormData.append("banner_type", "Footer Slider 3");
    reqFormData.append("reference_id", "0");
    this.http.getHomeBanner(reqFormData).subscribe((response: any) => {
      if ( response.status == true && response.code == this.globalVar.successCode) {
        this.footerSlider3List = response.data;
        this.footerSlider3List.map((ele: any) => {
          if(ele.banner_link == '') {
            ele['is_bannerlink'] = false;
          } else {
            ele['is_bannerlink'] = true;
          }
        })
      } else {
        if (response.code == this.globalVar.tokenCode) {
          // ...
        }
      }
    }, (err) => {
      console.log('err', err)
    })
  }

  fnSubcategory(subcat: any) {
    let navExtra: NavigationExtras = {
      state: {
        sub_cat: subcat,
        search_keyword: '',
        is_search: false
      }
    }

    this.navCtrl.navigateForward('details', navExtra);
  }

  fnOpenFooterSlide(data: any) {
    if(data.banner_link !== '' && data.banner_link !== '#') {
      const options = 'location=yes,hidden=yes';
      cordova.InAppBrowser.open(data.banner_link, '_system', options);
    }
  }

  fnRedirectWebsite(website: any) {
    let website_link;
    if(website == 'parlebazar') {
      website_link = 'https://parlebazaar.com/';
    } else if(website == 'parlekar') {
      website_link = 'https://www.parlekar.com/';
    } else {
      website_link = 'https://www.townparle.in/';
    }

    if(website_link != '') {
      const options = 'location=yes,hidden=yes';
      cordova.InAppBrowser.open(website_link, '_system', options);
    }
  }

  fnOpenAdBanner(footer_banner: any) {
    if(footer_banner.banner_link !== '' && footer_banner.banner_link !== '#') {
      const options = 'location=yes,hidden=yes';
      cordova.InAppBrowser.open(footer_banner.banner_link, '_system', options);
    }
  }
  
}
