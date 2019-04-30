import { Component, OnInit, Input } from '@angular/core';
import { DailyBoxOfficeList, BoxOfficeResult, RObject } from '../koficData';
import { KobisOpenAPIRestService } from '../kobis-open-apirest.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-daily-box-office',
  templateUrl: './daily-box-office.component.html',
  styleUrls: ['./daily-box-office.component.css']
})
export class DailyBoxOfficeComponent implements OnInit {
  public mtype;
  public mrange;
  public dataSource: DailyBoxOfficeList[];
  public mdailyBoxOfficeList: DailyBoxOfficeList[];
  public boxOfficeResult: BoxOfficeResult;
  public rootObject: RObject;
  displayColumns: string[] = ['rnum', 'rank', 'movieNm', 'openDt', 'salesAcc', 'audiAcc', 'scrnCnt' ];
  mdate = new Date();

  events: string[] = [];

  constructor(private kobisApi: KobisOpenAPIRestService) { }

  ngOnInit() {
    this.getDailyBoxOffice(this.mdate);
  }
  getDailyBoxOffice(date: Date) {
    this.kobisApi.getDailyBoxoffice(date)
                 .subscribe((data: RObject) => {
                    this.boxOfficeResult = data.boxOfficeResult;
                    this.mtype = data.boxOfficeResult.boxofficeType;
                    this.mrange = data.boxOfficeResult.showRange;
                    this.mdailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
                    this.dataSource = this.mdailyBoxOfficeList;
                   });
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.getDailyBoxOffice(this.mdate);
    console.log(`${type}: ${event.value}`);
  }
}
