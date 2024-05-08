import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  public about_us: any;
  public title: string = '';
  constructor(
    public globalVar: GlobalVarService
  ) {
    this.about_us = this.globalVar.settingData.about_us;
   }

  ngOnInit() {
  }

}
