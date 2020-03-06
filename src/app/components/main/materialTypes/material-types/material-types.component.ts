import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MaterialType } from 'src/app/models/materialType';
import { MaterialTypesService } from 'src/app/services/materialTypes/material-types.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-types',
  templateUrl: './material-types.component.html',
  styleUrls: ['./material-types.component.scss']
})
export class MaterialTypesComponent {

  selectedRowId: string = '-1';
  userName: string;
  selectedMaterialType: MaterialType;
  materialTypes: MaterialType[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<MaterialType>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private materialTypesService: MaterialTypesService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['sport','name', 'description', 'active'];
    me.userName = me.globals.userNameLogged;
    me.getMaterialTypesForCompany(me.userName);
  }

  private getMaterialTypesForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.materialTypesService.getMaterialTypes(userName)
      .subscribe(materialTypes => {
        me.materialTypes = materialTypes;
        me.dataSource = new MatTableDataSource<MaterialType>(materialTypes);
        me.dataSource.paginator = me.paginator;
        me.dataSource.sort = me.sort;
        me.globals.unMaskScreen();
      },
      error => {
        me.globals.unMaskScreen();
        me.toastr.error(error.message);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAddButton() {
    this.toastr.warning('To be implemented.');
    /* const pathToAccountDetail = `/accountdetail/-1`;

    this.router.navigate([pathToAccountDetail]); */
  }

  onClickEditButton() {
    this.toastr.warning('To be implemented.');
    /* const pathToAccountDetail = `/accountdetail/` + this.selectedRowId;

    this.router.navigate([pathToAccountDetail]); */
  }

  onClickRemoveButton() {
    this.toastr.warning('To be implemented.');
  }

  selectRow(row) {
    const me = this;

    me.selectedRowId = row.id;
    me.selectedMaterialType = me.getMaterialTypeById(me.selectedRowId);
  }

  getMaterialTypeById(selectedRowId: string): MaterialType {
    return this.materialTypes.find( function(x) { return x._id === selectedRowId; });
  }
}

