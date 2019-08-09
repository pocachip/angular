import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iMenu, iCategory } from '../app/common/menu_model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menusUrl = 'http://localhost:4200/assets/menus.json';

  gCategory: iCategory[]=[];

  constructor(private http: HttpClient) {} 

  getWeather(){
    let url = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastVersionCheck';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=Qtsm5ugZr70LdrHvi8yBHdbOUzdrAYkAbfMyuN5TO7cu7oS8sl67rUkqlJ%2B89D5TnKTXUOqj8852XrOeEbE1OQ%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('TEST_SERVICE_KEY'); /* 서비스 인증 */
    queryParams += '&' + encodeURIComponent('ftype') + '=' + encodeURIComponent('ODAM'); /* 파일구분 -ODAM: 동네예보실황 -VSRT: 동네예보초단기 -SHRT: 동네예보단기 */
    queryParams += '&' + encodeURIComponent('basedatetime') + '=' + encodeURIComponent('2015112030800'); /* 각각의 base_time 로 검색 참고자료 참조 */
    return this.http.get(url+queryParams);
  }

  getMenus(){
     return this.http.get<iMenu[]>(this.menusUrl);
  }

  initCategory(data: iMenu[], pa_id: string ='root' , lvl: number = 0){ 
    data.forEach((list,idx) => {
      let one: iCategory;
      one = { id: list.id, label: list.label, p_id: pa_id, level: lvl };
      this.gCategory.push(one);
      if (list.child !== undefined && list.child.length !== 0 ){
        let lv = lvl + 1;
        this.initCategory(list.child, list.id, lv);
      }
    });
  }

  getChildMenu(id: string ='root'){ 
//    console.log('getChildMenu --' + id);
//   console.log(this.gCategory); 
    let rtn: iCategory[]=[];
    this.gCategory.forEach((list) => {
      if(list.p_id == id) {
        rtn.push(list)
      }
    });
    return rtn;
  }
  
  getIndiMenu(){
    let rtn: iCategory[]=[
      {
        id : "90001",
        level : -1,
        label :"우리집TV",
        p_id : "root",
        icon: "baseline-home"
      },
      {
        id : "90002",
        level : -1,
        label : "검색",
        p_id : "root",
        icon: "baseline-search"
      },
      {
        id : "90003",
        level : -1,
        label :"즐게찾는 메뉴",
        p_id : "root",
        icon: "baseline-star_border"
      },
      {
        id : "90004",
        level : -1,
        label :"추천",
        p_id : "root",
        icon : "baseline-thumb_up"
      },
      {
        id : "90005",
        level : -1,
        label :"공지알림",
        p_id : "root",
        icon : "baseline_email"
      },
      {
        id : "90006",
        level : -1,
        label : "올레tv모바일",
        p_id : "root",
        icon : "baseline_developer"
      },
      {
        id : "90007",
        level : -1,
        label : "설정",
        p_id : "root",
        icon : "baseline-brightness" 
      }
    ];

    return rtn;
  }
}
