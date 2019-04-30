export interface DailyBoxOfficeList {
    rnum: string;
    rank: string;
    rankInten: string;
    rankOldAndNew: string;
    movieCd: string;
    movieNm: string;
    openDt: string;
    salesAmt: string;
    salesShare: string;
    salesInten: string;
    salesChange: string;
    salesAcc: string;
    audiCnt: string;
    audiInten: string;
    audiChange: string;
    audiAcc: string;
    scrnCnt: string;
    showCnt: string;
}

export interface BoxOfficeResult {
    boxofficeType: string;
    showRange: string;
    dailyBoxOfficeList: DailyBoxOfficeList[];
}

export interface RObject {
    boxOfficeResult: BoxOfficeResult;
}
