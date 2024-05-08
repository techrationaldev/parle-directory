import { Injectable, Injector, ViewChild } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { GlobalVarService } from './global-var.service';

export enum ConnectionStatus { Online, Offline }

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private get _router() { return this._injector.get(Router); }
  private readonly status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.Offline);

  constructor(
    private router: Router,
    private readonly platform: Platform,
    public modalCtrl: ModalController,
    private readonly network: Network,
    private readonly _injector: Injector,
    private readonly toast: ToastService,
    private readonly globalVar: GlobalVarService
  ) {
    this.fnInItNetwork();
  }

  fnInItNetwork() {
    this.platform.ready().then(() => {
      this.initializeNetworkEvents();
      const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    if (connection === 'Online') {
      this.globalVar.connection.next(true);
    } else {
      this.globalVar.connection.next(false);
    }
    this.toast.ToastShow(`You are now ${connection}`);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }


}
