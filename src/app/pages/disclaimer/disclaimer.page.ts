import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  public disclaimer: any;
  public title: string = '';

  constructor(
    public globalVar: GlobalVarService
  ) {
    this.disclaimer = this.globalVar.settingData.disclaimer;
   }

  ngOnInit() {
  }

}
