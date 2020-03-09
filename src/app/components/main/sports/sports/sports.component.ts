import { Component, OnInit, ViewChild } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { SportsService } from 'src/app/services/sports/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent  {

  selectedRowId: string = '-1';
  userName: string;
  selectedSport: Sport;
  sports: Sport[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Sport>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sportsService: SportsService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['name', 'description', 'sportTypeName', 'active'];
    me.userName = me.globals.userNameLogged;
    me.getSportsForCompany(me.userName);
  }

  private getSportsForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.sportsService.getSports(userName)
      .subscribe(sports => {
        me.sports = sports;
        me.dataSource = new MatTableDataSource<Sport>(sports);
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

    me.selectedRowId = row._id;
    me.selectedSport = me.getSportById(me.selectedRowId);
  }

  getSportById(selectedRowId: string): Sport {
    return this.sports.find( function(x) { return x._id === selectedRowId; });
  }
}


