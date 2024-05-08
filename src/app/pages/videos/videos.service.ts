import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  public videosUrl: string = 'app_getvideo';

  constructor(
    public http: HttpService,
    public loader: LoaderService
  ) { }


  getVideos() {
    var formdata = new FormData();
    return this.http.POST(this.videosUrl, formdata).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
