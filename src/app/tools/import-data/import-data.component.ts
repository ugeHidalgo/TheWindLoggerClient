import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { ImportMaterialTypesHelper } from './helpers/import-materialTypes.helper';
import { MaterialTypesService } from 'src/app/services/materialTypes/material-types.service';

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
  importMaterialTypessHelper: ImportMaterialTypesHelper;
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  dataEntities: DataEntity[] = [
    {value: 'materials', viewValue: 'Material deportivo'},
    {value: 'materialTypes', viewValue: 'ConTipos de material deportivo'},
    {value: 'spots', viewValue: 'Lugares'}
  ];

  constructor(
    private toastr: ToastrService,
    private materialTypesService: MaterialTypesService,
    private globals: GlobalsService
  ) {
    var me = this;

    me.importMaterialTypessHelper = new ImportMaterialTypesHelper(materialTypesService);
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
      case "materials":
          me.importMaterialTypessHelper.import(me.data)
            .subscribe(savedObjects => {
              me.globals.unMaskScreen();
              me.toastr.success(`A total of ${savedObjects.length} material types were successfully created.`);
            },
            error => {
              me.globals.unMaskScreen();
              me.toastr.error(error.message);
            });
        break;

      case "concepts":
        
        break;

      case "costCenters":
        
        break;

      default:
        break;
    }

  }
}
