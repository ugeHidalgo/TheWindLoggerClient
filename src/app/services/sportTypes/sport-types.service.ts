import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SportType } from 'src/app/models/sportType';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SportTypesService {
  private sportTypessUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.sportTypessUrl  = globals.server + 'api/sporttypes';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  getSportTypes(userName: string): Observable<SportType[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken(),
          getSportsUrl = `${me.sportTypessUrl}/?username=${userName}`;

    return this.http.get<SportType[]>(getSportsUrl, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( sportTypes => console.log(`A total of ${sportTypes.length} sport types were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<SportType[]>('getSportTypes', []))
              );
  }

  /**.*/
  createSportTypes(sportTypes: SportType[]): Observable<SportType[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<SportType[]>(me.sportTypessUrl, sportTypes, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${sportTypes.length} sport types were successfully created.`)),
                catchError(me.operationHelper.handleError<SportType[]>('createSportTypes', []))
              );
  }
}