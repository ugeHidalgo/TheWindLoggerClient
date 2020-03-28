import { Component, ViewChild, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionFilterData } from 'src/app/models/sessionFilterData';
import * as moment from 'moment';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  selectedRowId: string = '-1';
  userName: string;
  selectedSession: Session;
  sessions: Session[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Session>;
  validatingForm: FormGroup;
  sessionFilterData: SessionFilterData;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sessionsService: SessionsService,
    private toastr: ToastrService,
    private globals: GlobalsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const me = this;

    me.displayedColumns = ['sessionDate', 'name', 'sportName', 'spotName', 'sessionTime', 'sessionDistance','maxSpeed', 'medSpeed'];
    me.userName = me.globals.userNameLogged;
    me.sessionFilterData = new SessionFilterData();

    me.createForm();
    //me.getSessionsForCompany(me.userName);
  }

  ngOnInit() {
    const me = this;
          
    me.sessionFilterData.userName = me.globals.userNameLogged;
    me.setSearchPeriod('week');

    me.writeDateFromInForm();
    me.writeDateToInForm();

    me.onClickSearchButton();
  }

  /* private getSessionsForCompany(userName: string): void {
    const me = this;

    me.globals.maskScreen();
    me.sessionsService.getSessions(userName)
      .subscribe(sessions => {
        me.sessions = sessions;
        me.dataSource = new MatTableDataSource<Session>(sessions);
        me.dataSource.paginator = me.paginator;
        me.dataSource.sort = me.sort;
        me.globals.unMaskScreen();
      },
      error => {
        me.globals.unMaskScreen();
        me.toastr.error(error.message);
      });
  } */

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Screen events
  onClickAddButton() {
    this.toastr.warning('To be implemented.');
    /* const pathToAccountDetail = `/accountdetail/-1`;

    this.router.navigate([pathToAccountDetail]); */
  }

  onClickEditButton() {
    const pathToAccountDetail = `/session-details/` + this.selectedRowId;

    this.router.navigate([pathToAccountDetail]);
  }

  onClickRemoveButton() {
    this.toastr.warning('To be implemented.');
  }

  onSearchPeriodTypeChange(periodSearchType: string) {
    const me = this;

    if (periodSearchType === 'year' ||
        periodSearchType === 'month' ||
        periodSearchType === 'week' ) {
          me.setSearchPeriod(periodSearchType);

          me.writeDateFromInForm();
          me.writeDateToInForm();
        }
  }

  onClickSearchButton() {
    var me = this;

    me.globals.maskScreen();

    me.sessionFilterData.dateFrom = me.getDateFrom();
    me.sessionFilterData.dateTo = me.getDateTo();

    me.sessionsService.getFilteredSessions(me.sessionFilterData)
      .subscribe(sessions => {
        me.sessions = sessions;
        me.dataSource = new MatTableDataSource<Session>(sessions);
        me.dataSource.paginator = me.paginator;
        me.dataSource.sort = me.sort;
        me.globals.unMaskScreen();
      },
      error => {
        me.globals.unMaskScreen();
        me.toastr.error(error.message);
      });
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      dateFrom: new FormControl('', [Validators.required]),
      dateTo: new FormControl('', [Validators.required])
    },
    { updateOn: 'blur'});
  }

  getDateFrom(): string {
    const me = this,
          formModel = me.validatingForm.value;

    return formModel.dateFrom;
  }

  writeDateFromInForm() {
    const me = this;

    me.validatingForm.patchValue({dateFrom: me.sessionFilterData.dateFrom })
  }

  getDateTo(): string {
    const me = this,
          formModel = me.validatingForm.value;

    return formModel.dateTo;
  }

  writeDateToInForm() {
    const me = this;

    me.validatingForm.patchValue({dateTo: me.sessionFilterData.dateTo })
  }

  setSearchPeriod(unitOfTime: moment.unitOfTime.StartOf) {
    const me = this,
          startDate = moment().startOf(unitOfTime).format('YYYY-MM-DD[T00:00:00.000Z]'),
          endDate = moment().endOf(unitOfTime).format('YYYY-MM-DD[T00:00:00.000Z]');

    me.sessionFilterData.dateFrom = startDate;
    me.sessionFilterData.dateTo = endDate;
  }

  selectRow(row) {
    const me = this;

    me.selectedRowId = row._id;
    me.selectedSession = me.getSessionById(me.selectedRowId);
    me.globals.selectedSession = me.selectedSession;
  }

  getSessionById(selectedRowId: string): Session {
    return this.sessions.find( function(x) { return x._id === selectedRowId; });
  }
}


