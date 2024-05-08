import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideosService } from './videos.service';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef | undefined;
  videoUrl: string | SafeResourceUrl | undefined;
  
  public videosList: Array<any> = [];
  public videoLink: any;
  // public videoId: any;
  // public embededLink: any = '';
  public title: string = '';

  constructor(
    public globalVar: GlobalVarService,
    private sanitizer: DomSanitizer,
    public http: VideosService
  ) {
    
   }

  ngOnInit() {
    this.fnGetVideos();
  }

    
  doRefresh(refresher: any) {
    if (refresher != '') {
      setTimeout(() => {
          this.videosList = [];
          refresher.target.complete();
          this.fnGetVideos();  
       
      }, 800);
    }
  }

  fnGetVideos() {
    this.http.getVideos().subscribe((response) => {
      if(response.status == true && response.code == this.globalVar.successCode) {
        this.videosList = response.data;
        if(this.videosList.length > 0) {
          this.videosList.map((ele) => {
            let videoId = ele.video_link.split('v=')[1];
            ele['embededLink'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
          })
        }
      }
    }, (err) => {
      console.log('err', err)
    })
  }



}
