import { Component, OnInit, ViewChild } from '@angular/core';
import { SportType } from 'src/app/models/sportType';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { SportTypesService } from 'src/app/services/sportTypes/sport-types.service';

@Component({
  selector: 'app-sport-types',
  templateUrl: './sport-types.component.html',
  styleUrls: ['./sport-types.component.scss']
})
export class SportTypesComponent  {

  selectedRowId: string = '-1';
  userName: string;
  selectedSportType: SportType;
  sportTypes: SportType[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<SportType>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sportTypesService: SportTypesService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['name', 'description', 'active'];
    me.userName = me.globals.userNameLogged;
    me.getSportTypesForCompany(me.userName);
  }

  private getSportTypesForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.sportTypesService.getSportTypes(userName)
      .subscribe(sportTypes => {
        me.sportTypes = sportTypes;
        me.dataSource = new MatTableDataSource<SportType>(sportTypes);
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
    me.selectedSportType = me.getSportTypeById(me.selectedRowId);
  }

  getSportTypeById(selectedRowId: string): SportType {
    return this.sportTypes.find( function(x) { return x._id === selectedRowId; });
  }
}


