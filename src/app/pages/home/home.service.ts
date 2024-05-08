import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeBannerUrl: string = 'app_getactivebanner';
  private categoryUrl: string = 'app_getactivecat';
  private subcategoryUrl: string = 'app_getactivesubcat';

  constructor(
    private http: HttpService,
    public loader: LoaderService,
  ) { }

  getHomeBanner(reqformdata: any) {
    this.loader.showLoader();
      return this.http.POST(this.homeBannerUrl, reqformdata).pipe(
        map((response: any) => {
          this.loader.hideLoader();
          return response;
        }),
      );
  }
  

  getCategory() {
    this.loader.showLoader();
    let reqFormData = new FormData();
      return this.http.POST(this.categoryUrl, reqFormData).pipe(
        map((response: any) => {
          this.loader.hideLoader();
          return response;
        }),
      );
  }

  getSubcategory(reqformdata: any) {
    this.loader.showLoader();
      return this.http.POST(this.subcategoryUrl, reqformdata).pipe(
        map((response: any) => {
          this.loader.hideLoader();
          return response;
        }),
      );
  }
}
