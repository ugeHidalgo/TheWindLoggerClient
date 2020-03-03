import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { ImportMaterialTypesHelper } from './helpers/import-materialTypes.helper';
import { MaterialTypesService } from 'src/app/services/materialTypes/material-types.service';
import { ImportSpotsHelper } from './helpers/import-spots.helper';
import { ImportSportsHelper } from './helpers/import-sports.helper';
import { SpotsService } from 'src/app/services/spots/spots.service';
import { SportsService } from 'src/app/services/sports/sports.service';

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
  selectedEntity : string;
  importMaterialTypesHelper: ImportMaterialTypesHelper;
  importSpotsHelper: ImportSpotsHelper;
  importSportsHelper: ImportSportsHelper;
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  dataEntities: DataEntity[] = [
    {value: 'sports', viewValue: 'Deportes'},
    {value: 'materials', viewValue: 'Material deportivo'},
    {value: 'materialTypes', viewValue: 'Tipos de material deportivo'},
    {value: 'spots', viewValue: 'Lugares'}
  ];

  constructor(
    private toastr: ToastrService,
    private materialTypesService: MaterialTypesService,
    private spotsService: SpotsService,
    private sportsService: SportsService,
    private globals: GlobalsService
  ) {
    var me = this;

    me.importMaterialTypesHelper = new ImportMaterialTypesHelper(materialTypesService);
    me.importSpotsHelper = new ImportSpotsHelper(spotsService);
    me.importSportsHelper = new ImportSportsHelper(sportsService);
  }

  onFileChange(evt: any) {
		/* wire up file reader */
    const reader: FileReader = new FileReader(),
          target: DataTransfer = <DataTransfer>(evt.target);

		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		reader.onload = (e: any) => {
      const bstr = e.target.result,
            wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'}), // read workbook
            wsname: string = wb.SheetNames[0], // grab first sheet
            ws: XLSX.WorkSheet = wb.Sheets[wsname];

			// save data
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
		};
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
          me.globals.unMaskScreen();
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

      default:
        break;
    }

  }
}
