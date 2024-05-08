import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  public privacy_policy: any;
  
  public title: string = '';

  constructor(
    public globalVar: GlobalVarService
  ) { 
    this.privacy_policy = this.globalVar.settingData.privacy_policy;
  }

  ngOnInit() {
  }

}
