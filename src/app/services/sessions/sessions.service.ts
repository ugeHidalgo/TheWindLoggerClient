import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SessionsService {
  private sessionsUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.sessionsUrl  = globals.server + 'api/sessions';
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
  createSessions(sessions: Session[]): Observable<Session[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Session[]>(me.sessionsUrl, sessions, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${sessions.length} sessions were successfully created.`)),
                catchError(me.operationHelper.handleError<Session[]>('createSessions', []))
              );
  }
}