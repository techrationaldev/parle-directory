import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.page.html',
  styleUrls: ['./our-team.page.scss'],
})
export class OurTeamPage implements OnInit {
  public our_team: any;
  
  public title: string = '';
  constructor(
    private sanitizer: DomSanitizer,
    public globalVar: GlobalVarService
  ) {
    this.our_team = sanitizer.bypassSecurityTrustHtml(this.globalVar.settingData.our_team);
   }

  ngOnInit() {
  }

}
