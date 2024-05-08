import { Component, Input, OnInit } from '@angular/core';

// ========================= Services and components ============================== //
import { GlobalVarService } from 'src/app/services/global-var.service';
import { GlobalFunService } from 'src/app/services/global-fun.service';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent implements OnInit {

  @Input() title_text: string = '';

  constructor(
    public globalVar: GlobalVarService,
    public globalFun: GlobalFunService,
    public networkService: NetworkService
  ) {
  }

  ngOnInit() {
    // console.log("NetworkConnectionComponent");
  }

  fnTryAgain() {
    this.networkService.fnInItNetwork();
  }

}
