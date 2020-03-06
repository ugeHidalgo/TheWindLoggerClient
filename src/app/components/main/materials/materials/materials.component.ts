import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Material } from 'src/app/models/material';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { MaterialsService } from 'src/app/services/materials/materials-service.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent {

  selectedRowId: string = '-1';
  userName: string;
  selectedMaterial: Material;
  materials: Material[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Material>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private materialsService: MaterialsService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['name', 'description','materialtype', 'brand', 'model', 'size', 'secondhand', 'purchasedate', 'active'];
    me.userName = me.globals.userNameLogged;
    me.getMaterialsForCompany(me.userName);
  }

  private getMaterialsForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.materialsService.getMaterials(userName)
      .subscribe(materials => {
        me.materials = materials;
        me.dataSource = new MatTableDataSource<Material>(materials);
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
    me.selectedMaterial = me.getMaterialById(me.selectedRowId);
  }

  getMaterialById(selectedRowId: string): Material {
    return this.materials.find( function(x) { return x._id === selectedRowId; });
  }
}

