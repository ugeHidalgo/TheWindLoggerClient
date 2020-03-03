import { Injectable } from '@angular/core';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/material';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private materialsUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.materialsUrl  = globals.server + 'api/materials';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  createMaterials(materials: Material[]): Observable<Material[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<Material[]>(me.materialsUrl, materials, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${materials.length} materials were successfully created.`)),
                catchError(me.operationHelper.handleError<Material[]>('createMaterials', []))
              );
  }
}
