import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionMaterialsService {

  private sessionMaterialsUrl: string;
  private importSessionMaterialsUrl: string;

  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.sessionMaterialsUrl  = globals.server + 'api/sessionmaterials';
    me.importSessionMaterialsUrl  = me.sessionMaterialsUrl  + '/import';

    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  getSessionMaterials(userName: string, id: string): Observable<SessionMaterial[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken(),
          getSessionMaterialsUrl = `${me.sessionMaterialsUrl}/?username=${userName}&id=${id}`;

    return this.http.get<SessionMaterial[]>(getSessionMaterialsUrl, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( sessionMaterials => console.log(`A total of ${sessionMaterials.length} session materials were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<SessionMaterial[]>('getSessionMaterials', []))
              );
  }

  /**.*/
  importSessionMaterials(sessionMaterials: SessionMaterial[]): Observable<SessionMaterial[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<SessionMaterial[]>(me.importSessionMaterialsUrl, sessionMaterials, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( importedSessionMaterials => console.log(`A total of ${importedSessionMaterials.length} session materials were successfully imported.`)),
                catchError(me.operationHelper.handleError<SessionMaterial[]>('importSessionMaterials', []))
              );
  }
}
