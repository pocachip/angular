import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) { 
     iconRegistry.addSvgIcon('baseline-email',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-email-24px.svg'));
     iconRegistry.addSvgIcon('baseline-brightness',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-brightness_low-24px.svg'));
     iconRegistry.addSvgIcon('baseline-developer',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-developer_mode-24px.svg'));
     iconRegistry.addSvgIcon('baseline-home',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-home-24px.svg'));
     iconRegistry.addSvgIcon('baseline-search',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-search-24px.svg'));
     iconRegistry.addSvgIcon('chevron-left',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/outline-chevron_left-24px.svg'))
     iconRegistry.addSvgIcon('baseline-person',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-person-24px.svg'));
     iconRegistry.addSvgIcon('baseline-star_border',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-star_border-24px.svg'));
     iconRegistry.addSvgIcon('baseline-thumb_up',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/config/baseline-thumb_up_alt-24px.svg'))
  }

  ngOnInit() {
  }

}
