import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from './menu.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mFocus';
  currentDate = new Date();
  elem;
  bFullScreen: boolean = false;
  constructor(@Inject(DOCUMENT) private document: any, private menuService: MenuService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
     iconRegistry.addSvgIcon('wi-cloudy-windy',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/weather/wi-cloudy-windy.svg'));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.elem = document.documentElement;
    setInterval(()=>{
      this.currentDate = new Date();
    }, 1000);
  }

  toggle(){
    console.log(this.bFullScreen);
    if( this.bFullScreen ) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
    this.bFullScreen = !this.bFullScreen;
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
