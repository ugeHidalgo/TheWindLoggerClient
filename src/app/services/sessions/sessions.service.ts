import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { tap, catchError } from 'rxjs/operators';
import { FilterData } from 'src/app/models/filterData';
import { SessionsInfo } from 'src/app/models/sessionsInfo';

@Injectable({
  providedIn: 'root'
})

export class SessionsService {
  private sessionsUrl: string;
  private importSessionsUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.sessionsUrl  = globals.server + 'api/sessions';
    me.importSessionsUrl  = me.sessionsUrl + '/import';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  getSessions(userName: string): Observable<Session[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken(),
          getSessionsUrl = `${me.sessionsUrl}/?username=${userName}`;

    return this.http.get<Session[]>(getSessionsUrl, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( sessions => console.log(`A total of ${sessions.length} sessions were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<Session[]>('getSessions', []))
              );
  }

  /**.*/
  getFilteredSessions(filterData: FilterData): Observable<Session[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Session[]>(me.sessionsUrl + '-filtered', filterData, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( sessions => console.log(`A total of ${sessions.length} sessions were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<Session[]>('getFilteredSessions', null))
              );
  }

  /**.*/
  getSessionsInfo(filterData: FilterData): Observable<SessionsInfo> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<SessionsInfo>(me.sessionsUrl + '-info', filterData, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log('sessions info successfully retrieved.')),
                catchError(me.operationHelper.handleError<SessionsInfo>('getSessionsInfo', null))
              );
  }

  /**.*/
  saveSession(session: Session): Observable<Session> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Session>(me.sessionsUrl, session, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( savedSession => console.log(`Sessions successfully created with id: ${savedSession._id}.`)),
                catchError(me.operationHelper.handleError<Session>('createSessions', null))
              );
  }

  /**.*/
  importSessions(sessions: Session[]): Observable<Session[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Session[]>(me.importSessionsUrl, sessions, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( importedSessions => console.log(`A total of ${importedSessions.length} sessions were successfully imported.`)),
                catchError(me.operationHelper.handleError<Session[]>('importSessions', []))
              );
  }
}
