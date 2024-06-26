import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { GlobalVarService } from 'src/app/services/global-var.service';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

declare let cordova: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public active = {
    header : 'About',
    txt: ''
  }
  public our_team: any;
  public about_us: any;
  public support_no: any;
  public disclaimer: any;
  public privacy_policy: any;
  public infoData: any = '';
  public title: string = '';

  constructor(
    public actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public globalVar: GlobalVarService,
    public navCtrl: NavController,
    public callnumber: CallNumber,
  ) { 
    
  }

  ngOnInit() {
    this.fnGetInfoData();
  }

  fnNavigateVideo() {
    this.navCtrl.navigateForward('videos');
  }

  fnFeedback() {
    this.navCtrl.navigateForward('feedback');
  }

  fnAboutUs() {
    this.navCtrl.navigateForward('about-us');
  }

  fnOurTeam() {
    this.navCtrl.navigateForward('our-team');
  }

  fnDisclaimer() {
    this.navCtrl.navigateForward('disclaimer');
  }

  fnPrivacyPolicy() {
    this.navCtrl.navigateForward('privacy-policy');
  }
  
  async fnSupport() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Call support',
      buttons: [
        {
          icon: 'call-outline',
          text: 'Voice call',
          data: {
            action: 'confirm',
          },
          handler: () => {
            this.fnCallTosupport(this.globalVar.settingData.support_no);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }


  fnGetInfoData() {
    if(this.globalVar.settingData) {
      this.about_us = this.globalVar.settingData.about_us;
      this.infoData = this.about_us;
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

  fnCallTosupport(phn: any) {
      this.callnumber.callNumber(phn, true).then((res)=> {
        console.log('res', res);
      }).catch((err) => {
        console.log('err', err)
      })
  }

}
