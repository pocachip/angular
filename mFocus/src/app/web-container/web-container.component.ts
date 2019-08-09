import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { WebUIComponent } from '../web-ui/web-ui.component';
import { v4 as uuid } from 'uuid';
import { iCategory, iWebCompConfig } from '../common/menu_model';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes'
import { IWebDriverCookie } from 'selenium-webdriver';

@Component({
  selector: 'app-web-container',
  templateUrl: './web-container.component.html',
  styleUrls: ['./web-container.component.css']
})
export class WebContainerComponent implements OnInit {
  @Input() menudata: iCategory[];
  @Output() newfocus: EventEmitter<any> = new EventEmitter();
  @ViewChildren(WebUIComponent) children : QueryList<WebUIComponent>;

  m_config: iWebCompConfig;
  lastVisited : WebUIComponent;
  private keyManager: FocusKeyManager<WebUIComponent>;
  bFocus : boolean = false;

  uid: string;
  constructor(private cdr: ChangeDetectorRef) { 
    this.uid = uuid();
  }

  ngOnInit() {
//    this.bFocus = false;
    this.lastVisited = null;
    
    this.m_config.fontsize = "2em";
    this.m_config.textalign = "center"
    this.m_config.width = "15em"
/*
    this.m_config.fontsize = "2em";
    this.m_config.textalign = "center"
    this.m_config.width = "15em"
    */
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('web container ngAfterviewinit called!!!');
    
    this.children.changes.subscribe(arg => {
      console.log('=================================================');
      this.keyManager = new FocusKeyManager(this.children).withWrap();
      console.log(`web container ${this.uid} bFocus => ${this.bFocus}`);
      if(this.bFocus){
        this.keyManager.setFirstItemActive();
      }
    });
  }
 
  hasChild(): boolean {
    return !(this.children.length === 0);
  }

  onKeydown(event){
    console.log('web-container onKeydown called!');
    switch(event.keyCode){
      case RIGHT_ARROW:
      case ENTER: {
        console.log('Right or Enter Arrow pressed!');
        break;
      }
      case LEFT_ARROW: {
        console.log('left Arrow pressed!');
        break;
      }
      default: {
        this.lastVisited.blur();
        this.keyManager.onKeydown(event);
        break;
      }
    }
  }

  focus(){
   let prev, cur;
    //find lastvisited focus
    if(this.lastVisited === null) {
        console.log('do set first child!!'); 
        this.keyManager.setFirstItemActive();
        this.lastVisited = this.children.first;
    } else {
      this.children.forEach((child, idx)=>{
          if(child === this.lastVisited){
              console.log('do set lastvisited child!!'); 
              child.focus();
          }
      });
    }
    this.cdr.detectChanges();
  }

  focusEvent(event){
    ////console.log('Web container : focusEvent fired!!');
//    console.log(this);
//    console.log(this.children.first.item);
    console.log('----------------------------->lastVisited');
    console.log(this.lastVisited);
    
    if(this.children.first.item.level === event.item.level){
      console.log('my child!!!');
    }else{
      console.log('others!!!!');
    }
    
    this.lastVisited = event;
    this.newfocus.emit(event);
  }
/*
    this.children.forEach(arg=>{ 
      console.log(arg);
    })
    */

}
