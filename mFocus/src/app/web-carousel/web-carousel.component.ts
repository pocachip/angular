import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MenuService } from '../menu.service';
import { iMenu, iCategory, iWebCompConfig } from '../common/menu_model';
import { WebContainerComponent  } from '../web-container/web-container.component';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { longStackSupport } from 'q';
import { WebUIComponent } from '../web-ui/web-ui.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-web-carousel',
  templateUrl: './web-carousel.component.html',
  styleUrls: ['./web-carousel.component.css']
})
export class WebCarouselComponent implements OnInit {
  @ViewChildren(WebContainerComponent) children: QueryList<WebContainerComponent>;
  private keyManager: FocusKeyManager<WebContainerComponent>;
  
  gMenus$: iMenu[]=[];
  gIndi : iCategory[]=[];
  gCat0 : iCategory[]=[];
  gCat1 : iCategory[]=[];
  gCat2 : iCategory[]=[];

  gConfig: iWebCompConfig;

  uid: string;
  lastVisited: WebContainerComponent;
  bFocus: boolean = false;

  @HostListener('window:keyup', ['$event'])
  onKeydown(event){
    console.log('web-container onKeydown called!');

    switch(event.keyCode){
      case RIGHT_ARROW:
      case ENTER: {
        console.log('Right or Enter Arrow pressed!');
        this.setNextItemActive();
        break;
      }
      case LEFT_ARROW: {
        console.log('left Arrow pressed!');
        this.setPreviousItemActive();
        break;
      }
      case UP_ARROW:
      case DOWN_ARROW: {
        this.children.forEach((child)=>{
          if(child.bFocus){
            child.onKeydown(event);
          }
        });
        break;
      }
    }
  }

  constructor(private app: AppComponent ,
    private menuService: MenuService, private cdr: ChangeDetectorRef) { this.uid = uuid(); }
  

  ngOnInit() {
    this.menuService.getMenus().subscribe(data => {
//      console.log('gMenues loaded!!');
      this.gMenus$ = data;
      this.menuService.initCategory(this.gMenus$); 

      this.gIndi = this.menuService.getIndiMenu();
      this.gCat0 = this.menuService.getChildMenu('root');
      this.gCat1 = this.menuService.getChildMenu(this.gCat0[0].id);
      this.bFocus = true;
      this.gConfig = {
      "width" : "15em",
      "fontsize" : "2em",
      "textalign" : "left"
      };     

      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('web carousel: ngAfterViewInit');
    this.keyManager = new FocusKeyManager(this.children);
    this.setFirstItemActive();
    this.cdr.detectChanges();
  }

  setFirstItemActive(): void {
    this.children.first.bFocus = true;
  }
 
  setNextItemActive(): void {
    let cur, next;
    
    this.children.forEach((child, index)=>{
        if(child.bFocus){
          cur = child;
          next = (index+1 == this.children.length)? 0 : index+1;
          console.log('next idx is ' + next);
        }
      }
    );

    this.children.forEach((child, index)=>{
        if(index == next){
          if(child.hasChild()){
            cur.bFocus = false;
            child.bFocus = true;
//            this.lastVisited = cur;
            child.focus();
          } else {
            console.log('child have no!!! doing nothing');
          }
        }
      }
    );
  }

  setPreviousItemActive(): void{
    let prev, cur;
    //find current focus
    this.children.forEach((child, index)=>{
        if(child.bFocus){
          cur = child;
          prev = (index-1 == this.children.length)? this.children.length : index-1;
        }
      }
    );
    this.children.forEach((child, index)=>{
        console.log('find foreach');
        console.log(child);
        if(index == prev){
          if(child.hasChild()){
            cur.bFocus = false;
            child.bFocus = true;
            cur.lastVisited = null;
//            this.lastVisited = cur; 
            child.focus();
//            this.lastVisited.focus();
          } else {
            console.log('do nothing becase prev have nothing')
          }
        }
      }
    );
  }


  focusChange(event){
    console.log('WebCarousel recevie fousChange fn call');
    console.log(event);
    this.lastVisited = event;
    switch(event.item.level){
      case 0: {
        this.gCat1 = this.menuService.getChildMenu(event.item.id);
        this.gCat2 = [];
        console.log(event.item.level);
        break;
      }
      case 1: {
        this.gCat2 = this.menuService.getChildMenu(event.item.id);
        event.lastVisited = null;
        console.log(event.item.level);
        break;
      }
      case 2: {
        console.log(event.item.level);
        break;
      }
    }
    this.cdr.detectChanges();
  }

  openFullscreen(){
    this.app.openFullscreen();
  }

  closeFullscreen(){
    this.app.closeFullscreen();
  }
}
