import { Component, OnInit, ViewChild } from '@angular/core';
import { Spot } from 'src/app/models/spot';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SpotsService } from 'src/app/services/spots/spots.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.scss']
})
export class SpotsComponent {

  selectedRowId: string = '-1';
  userName: string;
  selectedSpot: Spot;
  spots: Spot[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Spot>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private spotsService: SpotsService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['name', 'description', 'country', 'province', 'place', 'active'];
    me.userName = me.globals.userNameLogged;
    me.getSpotsForCompany(me.userName);
  }

  private getSpotsForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.spotsService.getSpots(userName)
      .subscribe(spots => {
        me.spots = spots;
        me.dataSource = new MatTableDataSource<Spot>(spots);
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
    me.selectedSpot = me.getSpotById(me.selectedRowId);
  }

  getSpotById(selectedRowId: string): Spot {
    return this.spots.find( function(x) { return x._id === selectedRowId; });
  }
}