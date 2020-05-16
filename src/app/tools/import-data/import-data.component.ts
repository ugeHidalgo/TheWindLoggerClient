import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { ImportMaterialTypesHelper } from './helpers/import-materialTypes.helper';
import { MaterialTypesService } from 'src/app/services/materialTypes/material-types.service';
import { ImportSpotsHelper } from './helpers/import-spots.helper';
import { ImportSportsHelper } from './helpers/import-sports.helper';
import { ImportSportTypesHelper } from './helpers/import-sportTypes.helper';
import { SpotsService } from 'src/app/services/spots/spots.service';
import { SportsService } from 'src/app/services/sports/sports.service';
import { SportTypesService } from 'src/app/services/sportTypes/sport-types.service';
import { ImportMaterialsHelper } from './helpers/import-materials.helper';
import { MaterialsService } from 'src/app/services/materials/materials-service.service';
import { ImportSessionsHelper } from './helpers/import-sessions.helper';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { SessionMaterialsService } from 'src/app/services/sessionMaterials/session-materials.service';
import { ImportSessionMaterialsHelper } from './helpers/import-sessionMaterials.helper';

type AOA = any[][];
export interface DataEntity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {

  data: AOA;
  stravaData: any;
  selectedEntity : string;
  importMaterialTypesHelper: ImportMaterialTypesHelper;
  importMaterialsHelper: ImportMaterialsHelper;
  importSpotsHelper: ImportSpotsHelper;
  importSportsHelper: ImportSportsHelper;
  importSessionsHelper: ImportSessionsHelper;
  importSessionMaterialsHelper: ImportSessionMaterialsHelper;
  importSportTypesHelper: ImportSportTypesHelper;
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  dataEntities: DataEntity[] = [
    {value: 'sporttypes', viewValue: 'Tipos de deportes'},
    {value: 'sports', viewValue: 'Deportes'},
    {value: 'materials', viewValue: 'Material deportivo'},
    {value: 'materialTypes', viewValue: 'Tipos de material deportivo'},
    {value: 'spots', viewValue: 'Lugares'},
    {value: 'sessions', viewValue: 'Sesiones(excell)'},
    {value: 'strava_sessions', viewValue: 'Sesiones(Strava)'},
    {value: 'sessionMaterials', viewValue: 'Materiales usados en sesiones(excell)'}
  ];

  constructor(
    private toastr: ToastrService,
    private materialsService: MaterialsService,
    private materialTypesService: MaterialTypesService,
    private spotsService: SpotsService,
    private sportsService: SportsService,
    private sessionsService: SessionsService,
    private sessionMaterialsService: SessionMaterialsService,
    private sportTypesService: SportTypesService,
    private globals: GlobalsService
  ) {
    var me = this;

    me.importMaterialTypesHelper = new ImportMaterialTypesHelper(materialTypesService);
    me.importMaterialsHelper = new ImportMaterialsHelper(materialsService);
    me.importSpotsHelper = new ImportSpotsHelper(spotsService);
    me.importSportsHelper = new ImportSportsHelper(sportsService);
    me.importSessionsHelper = new ImportSessionsHelper(sessionsService);
    me.importSessionMaterialsHelper = new ImportSessionMaterialsHelper(sessionMaterialsService);
    me.importSportTypesHelper = new ImportSportTypesHelper(sportTypesService);
  }

  onFileChange(evt: any) {
		/* wire up file reader */
    const  me = this,
           reader: FileReader = new FileReader(),
           target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    if (me.selectedEntity === 'strava_sessions')
    {
      reader.onloadend = (e: any) => {        
        me.data = JSON.parse(e.target.result);
      }; 
    } else {
      reader.onload = (e: any) => {
        const bstr = e.target.result,
              wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'}), // read workbook
              wsname: string = wb.SheetNames[0], // grab first sheet
              ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // save data
        me.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      };
    }
		reader.readAsBinaryString(target.files[0]);
	}

	import(): void {
    const me = this;

    me.globals.maskScreen();
    if (!me.selectedEntity) return;
    switch (me.selectedEntity) {
      case "materialTypes":
          me.importMaterialTypesHelper.import(me.data)
            .subscribe(savedObjects => {
              me.globals.unMaskScreen();
              me.toastr.success(`A total of ${savedObjects.length} material types were successfully created.`);
            },
            error => {
              me.globals.unMaskScreen();
              me.toastr.error(error.message);
            });
        break;

      case "materials":
        me.importMaterialsHelper.import(me.data)
        .subscribe(savedObjects => {
          me.globals.unMaskScreen();
          me.toastr.success(`A total of ${savedObjects.length} material were successfully created.`);
        },
        error => {
          me.globals.unMaskScreen();
          me.toastr.error(error.message);
        });
        break;

      case "sporttypes":
          me.importSportTypesHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} sport types were successfully created.`);
          },
          error => {
            me.globals.unMaskScreen();
            me.toastr.error(error.message);
          });
        break;

      case "sports":
          me.importSportsHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} sports were successfully created.`);
          },
          error => {
            me.globals.unMaskScreen();
            me.toastr.error(error.message);
          });
        break;

      case "spots":
          me.importSpotsHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} spots were successfully created.`);
          },
          error => {
            me.globals.unMaskScreen();
            me.toastr.error(error.message);
          });
        break;

      case "sessions":
          me.importSessionsHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} sessions were successfully created.`);
          },
          error => {
            me.globals.unMaskScreen();
            me.toastr.error(error.message);
          });
        break;

      case "strava_sessions":
         /*  me.importStravaSessionsHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} sessions were successfully created.`);
          },
          error => { */
            me.globals.unMaskScreen();
            //me.toastr.error(error.message);
          //});
        break;

      case "sessionMaterials":
        me.importSessionMaterialsHelper.import(me.data)
          .subscribe(savedObjects => {
            me.globals.unMaskScreen();
            me.toastr.success(`A total of ${savedObjects.length} session materials were successfully created.`);
          },
          error => {
            me.globals.unMaskScreen();
            me.toastr.error(error.message);
          });
        break;


      default:
        break;
    }

  }
}
