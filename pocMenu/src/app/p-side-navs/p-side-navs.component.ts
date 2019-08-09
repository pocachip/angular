import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../menu.service';
import { iMenu, iCategory } from '../common/menu.model';
import { NumberSymbol } from '@angular/common';

@Component({  
  selector: 'app-p-side-navs',
  templateUrl: './p-side-navs.component.html',
  styleUrls: ['./p-side-navs.component.css']
})
export class PSideNavsComponent implements OnInit, AfterViewInit {
//  gMenus$: iMenu[];
//  gCategoryMenu : iCategory[] = [];
  category1_id = null;
  category2_id = null;
  category3_id = null;
  gMenu1: iCategory[] = [];
  gMenu2: iCategory[] = [];
  gMenu3: iCategory[] = [];

  constructor(private menuService: MenuService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    return this.menuService.getMenus().subscribe(data => {
      this.menuService.gMenus$ = data;
      this.menuService.initMenu(this.menuService.gMenus$);
      /*
      console.log('=================');
      console.log(this.getChildMenu('103'));
      console.log('=================');
      console.log(this.findMenu(this.gMenus$, '0'));
      */
      console.log(this.menuService.gCategoryMenu);
      this.gMenu1 = this.menuService.getChildMenu('root'); 
    });
  }

  ngAfterViewInit() {
  }

  onSelected(sel_id){
     console.log('Selected Menu' + sel_id); 
     this.gMenu2 = this.menuService.getChildMenu(sel_id);
  }

/*
  initMenu(data: iMenu[], pa_id: string ='root' , lvl: number = 0){
//    console.log(`call initMenu with ${data}, pa_id ${pa_id}, level ${lvl}`);

    data.forEach((list,idx) => {
      let one: iCategory;
      one = { id: list.id, label: list.label, p_id: pa_id, level: lvl };
      this.gCategoryMenu.push(one);
 //     console.log(`add { ${one.id} : ${one.label} : ${one.level} : ${one.p_id} }`);
      if (list.child !== undefined && list.child.length !== 0 ){
  //      console.log(`id: ${list.id} label: ${list.label} has ${list.child.length} child!!!`);
        let lv = lvl + 1;
        this.initMenu(list.child, list.id, lv);
      }
    });
  }

  findMenu(menu: iMenu[], id: string): iMenu { 
   // console.log(`findMenu call with ${menu} id: ${id}`);
    let rtn: iMenu = null;
    menu.forEach((list)=>{
      if( list.id !== undefined && list.id === id ) {
         rtn = list;
 //        console.log(`finded id: ${list.id} label: ${list.label}`);
      } 
      if(rtn === null && this.hasChildMenu(list)){
          rtn = this.findMenu(list.child, id);
      }
    });

//    console.log(`return id: ${rtn.id} label ${rtn.label}`);
    return rtn;
  }

  hasChildMenu(menu: iMenu): boolean {
      return (menu.child !== undefined && menu.child.length !== 0 );
  }

  getChildMenu(id: string): iCategory[]{
    let rtnMenu: iCategory[] = [];
    this.gCategoryMenu.forEach((list)=>{
       if( list.p_id === id ) {
         rtnMenu.push(list);
       }
    })
    return rtnMenu;
  }
  */
}
