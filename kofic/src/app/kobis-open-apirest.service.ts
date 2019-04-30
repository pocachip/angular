import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { DailyBoxOfficeList, BoxOfficeResult, RObject } from './koficData';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const DAILY_BOXOFFICE_URI = '/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList';
const WEEKLY_BOXOFFICE_URI = '/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList';
const COM_CODE_LIST_URI = '/kobisopenapi/webservice/rest/code/searchCodeList';
const MOVIE_LIST_URI = '/kobisopenapi/webservice/rest/movie/searchMovieList';
const MOVIE_INFO_URI = '/kobisopenapi/webservice/rest/movie/searchMovieInfo';
const COMPANY_LIST_URI = '/kobisopenapi/webservice/rest/company/searchCompanyList';
const COMPANY_INFO_URI = '/kobisopenapi/webservice/rest/company/searchCompanyInfo';
const PEOPLE_LIST_URI = '/kobisopenapi/webservice/rest/people/searchPeopleList';
const PEOPLE_INFO_URI = '/kobisopenapi/webservice/rest/people/searchPeopleInfo';


@Injectable({
  providedIn: 'root'
})
export class KobisOpenAPIRestService {
  private key = 'a31b5a02d9b87ec3591054850f601a5f';
  host = 'http://www.kobis.or.kr';
  isJson = true;
  dataType = this.isJson ? 'json' : 'xml';
  targetDt = '20120101';


  // tslint:disable-next-line: indent
  constructor(private http: HttpClient) { }

  getDailyBoxoffice(): Observable<RObject> {
    const url = `${this.host}${DAILY_BOXOFFICE_URI}.${this.dataType}?key=${this.key}&targetDt=${this.targetDt}`;
    console.log(url);
    return this.http.get<RObject>(url);
  }

}
