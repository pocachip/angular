import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-web-ui',
  templateUrl: './web-ui.component.html',
  styleUrls: ['./web-ui.component.css']
})
export class WebUIComponent implements OnInit {
  @Input() item;
  @Output() focused : EventEmitter<any> = new EventEmitter();
  uid: string
  bFocus: boolean = false;

  constructor(private host: ElementRef, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
     this.uid = uuid(); 
     iconRegistry.addSvgIcon('chevron-left',
        sanitizer.bypassSecurityTrustResourceUrl('assets/outline-chevron_left-24px.svg'));
     iconRegistry.addSvgIcon('chevron-right',
        sanitizer.bypassSecurityTrustResourceUrl('assets/outline-chevron_right-24px.svg'));
  }

  ngOnInit() {
  }

  onfocus() {
    //console.log('web ui compoent: onFoucs');
    this.focused.emit(this);
  }

  focus() {
    console.log('web ui: focus called');
    console.log(this);

    //becaouse natvieElement point to this component
    // firstChild is real div class="webui"
    this.host.nativeElement.firstChild.focus(); 
    this.bFocus = true;
  }

  blur() {
    console.log('web ui: blur called');
    this.host.nativeElement.firstChild.blur();
    this.bFocus = false;
  }
  
}
