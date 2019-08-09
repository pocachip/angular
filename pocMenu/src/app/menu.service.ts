import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { iMenu, iCategory } from './common/menu.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  gMenus$: iMenu[];
  gCategoryMenu : iCategory[] = [];

  private menusUrl = 'http://localhost:4200/assets/menus.json';

  constructor(private http: HttpClient) {}

  getMenus(){
     return this.http.get<iMenu[]>(this.menusUrl);
  }

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
}
