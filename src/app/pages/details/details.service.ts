import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private businessListUrl: string = 'app_getactivebiz';
  private adbannerUrl: string = 'app_getactivebanner';
  private searchUrl: string = 'app_getsearch';

  constructor(
    private http: HttpService,
    public loader: LoaderService,
  ) { }


  search(reqData: any): Observable<any> {
    this.loader.showLoader();
    return this.http.POST(this.searchUrl, reqData).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      }),
    );
  }

  getAdBanner(reqData: any): Observable<any> {
    this.loader.showLoader();
    return this.http.POST(this.adbannerUrl, reqData).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      }),
    );
  }

  getBusiness(reqData: any): Observable<any> {
    this.loader.showLoader();
    return this.http.POST(this.businessListUrl, reqData).pipe(
      map((response: any) => {
        this.loader.hideLoader();
        return response;
      }),
    );
  }
}
