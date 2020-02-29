import { Injectable } from '@angular/core';
import { MaterialType } from 'src/app/models/materialType';
import { Observable } from 'rxjs';
import { OperationsHelper } from '../operations.helper';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypesService {
  private materialTypesUrl: string;
  private operationHelper: OperationsHelper;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private router: Router
  ) { 
    const me = this;

    me.materialTypesUrl  = globals.server + 'api/materialtypes';
    me.operationHelper = new OperationsHelper(globals,router);
  }

  /**.*/
  createMaterialTypes(materialTypes: MaterialType[]): Observable<MaterialType[]> {
    const me = this,
          httpOptions = me.operationHelper.createHttpOptionsWithToken();

    return this.http.post<MaterialType[]>(me.materialTypesUrl, materialTypes, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap( any => console.log(`A total of ${materialTypes.length} material types were successfully created.`)),
                catchError(me.operationHelper.handleError<MaterialType[]>('createMaterialTypes', []))
              );
  }
}
