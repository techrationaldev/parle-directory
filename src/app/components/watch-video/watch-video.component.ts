import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
})
export class WatchVideoComponent  implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef | undefined;
  videoUrl: string | SafeResourceUrl | undefined;

  public videoLink: any;
  public videoId: any;
  public embededLink: any = '';

  constructor(
    public nav: NavParams,
    public modalCtrl: ModalController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
  ) {
    this.videoLink = this.nav.get('link');
    this.videoId = this.videoLink.split('v=')[1];
    this.embededLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoId);
   }

  ngOnInit() {
  }

}
