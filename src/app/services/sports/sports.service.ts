import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sport } from 'src/app/models/sport';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SportsService {
  private sportsUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.sportsUrl  = globals.server + 'api/sports';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  getSports(userName: string): Observable<Sport[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken(),
          getSportsUrl = `${me.sportsUrl}/?username=${userName}`;

    return this.http.get<Sport[]>(getSportsUrl, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( sports => console.log(`A total of ${sports.length} sports were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<Sport[]>('getSports', []))
              );
  }

  /**.*/
  createSports(sports: Sport[]): Observable<Sport[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Sport[]>(me.sportsUrl, sports, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${sports.length} sports were successfully created.`)),
                catchError(me.operationHelper.handleError<Sport[]>('createSports', []))
              );
  }
}