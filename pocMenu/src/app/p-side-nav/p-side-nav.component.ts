import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, HostListener, Renderer, Input, Output, EventEmitter, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../menu.service';
import { iMenu, iCategory } from '../common/menu.model';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ListKeyManager } from '@angular/cdk/a11y';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-p-side-nav',
  templateUrl: './p-side-nav.component.html',
  styleUrls: ['./p-side-nav.component.css'],
  animations: [
    trigger('showState', [
      state('open', style({
         transform: 'translateX(0%)'
      })),
      state('close', style({
         transform: 'translateX(-100%)'
      })),
      transition('* => *',[ animate('400ms ease-in-out')])
    ])
  ]
})

export class PSideNavComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() category1_id: string;
  @Input() i_menus: iCategory[];
  @Input() category2_id: string;
  @Input() category3_id: string;
  @Input() top: number = 0;
  @Input() left: number = 0;
  @ViewChildren('menuItem') menus !: QueryList<any>;

  @Output() selected_id: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);
    if (event.keyCode === ENTER || event.keyCode === DOWN_ARROW ) {
      this.goNext();
    } else if ( event.keyCode === UP_ARROW ) {
      this.goPrev();
    } else if ( event.keyCode === RIGHT_ARROW ) {
    } else {
    }
  }

  private keyManager: ListKeyManager<any>;
  isOpen = true;

  test: string = '';

  gMenus$: iMenu[];

  idxMenu: number = 0;   // 현재 메뉴 번호 index

  cntPageItem: number = 4;   // 페이지별 보여줄 메뉴 수
  cntTotalPage: number = 0;  // 전체 페이지 수
  numCurPage: number = 1;    // 현재 PageNumber

  bLastPageScroll: boolean = false;
  pageStart: number;
  pageEnd: number;
  bLastPage = false;
  bFirstPage = true;
  itemSize = 0;


  constructor(private host: ElementRef, private menuService: MenuService, private renderer: Renderer, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
 //   this.gMenus$ = this.i_menus;
//    this.itemSize = this.gMenus$.length;
    this.itemSize = this.i_menus.length;
    this.cntTotalPage = Math.ceil(this.itemSize / this.cntPageItem);

    let remainder = this.itemSize % this.cntPageItem;
    // if remainder exist we scrolled when last page
    if( remainder !== 0 ){
      this.bLastPageScroll = true;
    }
    this.setHomePage();
    /*
    console.log('-----aftercontent_init--------------');
    this.cdr.detectChanges();
    console.log(this);
    console.log('-------------------');

    if(this.category1_id === null || this.category1_id === undefined) {
      console.log('category1_id is null');
      return this.menuService.getMenus().subscribe(data => {
        this.gMenus$ = data;
        this.itemSize = this.gMenus$.length;
        this.cntTotalPage = Math.ceil(this.itemSize / this.cntPageItem);

        let remainder = this.itemSize % this.cntPageItem;
        // if remainder exist we scrolled when last page
        if( remainder !== 0 ){
          this.bLastPageScroll = true;
        }
        this.setHomePage();
      });
    } else {
      console.log('p_id is not null'+ this.category1_id);
    }
    */
  }

  ngAfterContentInit(){

  }
  ngAfterViewInit(){
//    console.log(this.menus);
    // hack by pocachip ...wait to init content while nothing do...
    this.keyManager = new ListKeyManager(this.menus);
    this.keyManager.withVerticalOrientation(true);
    this.keyManager.withWrap();
    //console.log(this.keyManager);


    this.menus.changes.subscribe(c => { c.toArray().forEach(item => {});
/*    console.log('=---------');
     console.log(this.menus);
    console.log('=---------');*/
     this.myFocus(this.idxMenu); //hack because alway 0 index first
     //console.log(this.gMenus$);
    });
    if ( this.top !== 0 || this.left !== 0 ){
      console.log('top or left not zero!');
    }
  }

  onclick(){
    this.goNext();
  }

  focus() {
    //console.log('focus called');
//    this.menus.first.nativeElement.focus();
    //this.host.nativeElement.firstChild.focus();
  }

  myFocus(i: number){
    //console.log(this.menus);
//    console.log(this.idxMenu);
//    console.log(this.menus._results);
    if ( this.isLastPage() && this.bLastPageScroll){
        //console.log("scroll MOde with"+i);
        let findedMenuLabel: string = '';
        this.i_menus.forEach(element => {
//          console.log(element);
          //console.log(`elm.id: ${element.id} i:${i}`);
          if( element.id === i.toString()) {
            findedMenuLabel = element.label;
          }
        });
       //console.log('finded! :'+ findedMenuLabel);

        this.menus.forEach((list,idx)=>{
          let strHTML =list.nativeElement.innerHTML;
          //console.log(strHTML);
          if(strHTML.trim() === findedMenuLabel) {
            //console.log('invoke called!');
            this.renderer.invokeElementMethod(list.nativeElement, 'focus');
          }
        });
      } else {
        let remainder = (this.idxMenu) % this.cntPageItem;
 //     console.log(`i: ${i} idxMenu: ${this.idxMenu} remainder: ${remainder}`);
        this.menus.forEach((list,idx)=>{
          if(remainder === idx) {
  //          console.log('invoke called!');
            this.renderer.invokeElementMethod(list.nativeElement, 'focus')
          }
        });
      }
      this.selected_id.emit(i.toString());
  }

  prepareMenu() {
    this.goPrev();
//    console.log('total Menu length:' + this.gMenus$.length);
  }

  goNext(){
    this.idxMenu = (this.idxMenu === this.itemSize-1) ? 0 : this.idxMenu+1;
    this.refreshPage()
  }

  goPrev(){
    this.idxMenu = (this.idxMenu === 0) ? this.itemSize-1 : this.idxMenu-1;
    this.refreshPage();
  }

  isLastPage(): boolean {
     //console.log(`isLastPage : ${this.cntTotalPage} / ${this.numCurPage}`);
     return (this.cntTotalPage === this.numCurPage );
  }

  setCurPage() {
     this.numCurPage = Math.floor(this.idxMenu / this.cntPageItem) + 1;
  }

  setPageRange(){
    this.pageStart = (this.numCurPage-1)*this.cntPageItem;
    this.pageEnd = this.pageStart + this.cntPageItem;
  }

  setHomePage() {
    this.idxMenu = 0;
    this.numCurPage = 0;
    this.setCurPage();
    this.setPageRange();
  }

  refreshPage(){
    // 1. caculate current page from menuidx
   // this.setCurPage();
    //console.log(' ');
    //console.log(`RefresPage: page from ${this.pageStart} to ${this.pageEnd} : idx ${this.idxMenu} this page ${this.numCurPage}`);

    this.setCurPage();

    // 2. setup view slice: start & end
    if( this.idxMenu === 0) {
      console.log('goHome!!');
      this.setHomePage();
      return;
    }

    if ( this.isLastPage() && this.bLastPageScroll){
     //console.log(`   action!!!!!!!!!!!!!! ${this.pageEnd} : ${this.itemSize} ${this.numCurPage}`);
      let remainder = (this.idxMenu+1) % this.cntPageItem;
      if( remainder > 0 ){
        let remainder = (this.idxMenu+1) % this.cntPageItem;
        //console.log(`   itemSize =${this.itemSize} cntPageItem ${this.cntPageItem} remain: ${remainder} numCurPage: ${this.numCurPage}`);
        this.pageStart =(this.numCurPage-2)*this.cntPageItem + remainder;
        this.pageEnd = this.pageStart + this.cntPageItem;
      }

    } else {
      this.pageStart = (this.numCurPage-1)*this.cntPageItem;
      this.pageEnd = this.pageStart + this.cntPageItem;
    //  console.log(`setFromToPage: page from ${this.pageStart} to ${this.pageEnd}`);
      this.myFocus(this.idxMenu); //hack because alway 0 index first
    }
    //console.log(`FromToPage: page from ${this.pageStart} to ${this.pageEnd} : idx ${this.idxMenu}`);
  }


  setNextPage() {
    //this.itemSize = this.gMenus$.length;
    this.itemSize = this.i_menus.length;
    this.cntTotalPage = Math.floor(this.itemSize / this.cntPageItem);

    this.numCurPage = Math.floor(this.idxMenu / this.cntPageItem + 1);

    this.goNext();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
