import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals/globals.service';
import { SessionFilterData } from 'src/app/models/sessionFilterData';
import * as moment from 'moment';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Session } from 'src/app/models/session';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-sessions-info',
  templateUrl: './sessions-info.component.html',
  styleUrls: ['./sessions-info.component.scss']
})
export class SessionsInfoComponent implements OnInit {

  userName: string;
  validatingForm: FormGroup;
  sessionFilterData: SessionFilterData;
  sessions: Session[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Session>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected globals: GlobalsService,
    protected sessionsService: SessionsService,
    protected toastr: ToastrService
  ) {
    const me = this;

    me.displayedColumns = ['sessionDate', 'name', 'sportName', 'spotName', 'sessionTime', 'sessionDistance','maxSpeed', 'medSpeed'];

    me.createForm();
    me.sessionFilterData = new SessionFilterData();
  }

  ngOnInit() {
    const me = this;
          
    me.sessionFilterData.userName = me.globals.userNameLogged;
    me.setSearchPeriod('week');

    me.writeDateFromInForm();
    me.writeDateToInForm();

    me.onClickSearchButton();
  }

  //Screen events
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
}
