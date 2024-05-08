import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { concatMap, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  
  private loadingRequestsStream$: Subject<boolean> | undefined;
  private loaderElement: any;
  private lazyDismissTimer: any;


  constructor(
    private readonly loadingCtrl: LoadingController
  ) {
    this.initValues(); 
  }


  private initValues() {
    this.loaderElement = null;
    this.lazyDismissTimer = null;
    this.loadingRequestsStream$ = new Subject();
    this.loadingRequestsStream$.pipe(
      distinctUntilChanged(),
      concatMap(loader => {
        if (loader) {
          return this.createLoader()
        } else {
          return this.dismissLoader()
        };
      })
    )
      .subscribe(); 
  }

  private async createLoader(): Promise<void> {
    if (!this.loaderElement) {
      this.loaderElement = await this.loadingCtrl.create({
        message: '', 
        spinner: 'dots',
        cssClass: 'loader',
        backdropDismiss: false,
      });
      return this.loaderElement.present();
    } else {
      return Promise.resolve();
    };
  }

  private async dismissLoader(): Promise<void> {
    // here we check if loader element exists and that there is no timer running already
    if (this.loaderElement && !this.lazyDismissTimer) {
      // we set the timer
      this.lazyDismissTimer = setTimeout(async () => {
        // after 700ms we dismiss our loader element:
        await this.loaderElement.dismiss();
        // nullify our properties right after dismiss promise fulfilled itself:
        this.loaderElement = null;
        clearTimeout(this.lazyDismissTimer);
        this.lazyDismissTimer = null;
        // still remember to return a promise to let concatMap know it can proceed
        return Promise.resolve();
      }, 700)
    } else {
      // if loader element does not exist or if there is already a timer running - there is nothing to dismiss, we just return empty promise
      return Promise.resolve();
    };
  }

  public showLoader() {
    if(this.loadingRequestsStream$) {
      this.loadingRequestsStream$.next(true);
    }
  }

  public hideLoader() {
    if(this.loadingRequestsStream$) {
      this.loadingRequestsStream$.next(false);
    }
  }

}
