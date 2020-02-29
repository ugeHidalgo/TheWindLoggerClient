import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotsService {
  private spotsUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.spotsUrl  = globals.server + 'api/spots';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  getSpots(userName: string): Observable<Spot[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken(),
          getSpotsUrl = `${me.spotsUrl}/?username=${userName}`;

    return this.http.get<Spot[]>(getSpotsUrl, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( spots => console.log(`A total of ${spots.length} spots were successfully retrieved.`)),
                catchError(me.operationHelper.handleError<Spot[]>('getSpots', []))
              );
  }

  /**.*/
  createSpots(spots: Spot[]): Observable<Spot[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Spot[]>(me.spotsUrl, spots, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${spots.length} spots were successfully created.`)),
                catchError(me.operationHelper.handleError<Spot[]>('createSpots', []))
              );
  }
}
