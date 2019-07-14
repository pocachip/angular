import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { iMenu } from './common/menu.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menusUrl = 'http://localhost:4200/assets/menus.json';

  constructor(private http: HttpClient) {}

  getMenus(){
     return this.http.get<iMenu[]>(this.menusUrl);
  }
}
