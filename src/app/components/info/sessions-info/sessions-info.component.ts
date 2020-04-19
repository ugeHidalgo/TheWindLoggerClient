import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals/globals.service';
import { SessionFilterData } from 'src/app/models/sessionFilterData';
import * as moment from 'moment';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Session } from 'src/app/models/session';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SessionsInfo } from 'src/app/models/sessionsInfo';
import { FormattersHelper } from 'src/app/tools/formaters.helper';

@Component({
  selector: 'app-sessions-info',
  templateUrl: './sessions-info.component.html',
  styleUrls: ['./sessions-info.component.scss']
})
export class SessionsInfoComponent implements OnInit {

  userName: string;
  validatingForm: FormGroup;
  sessionFilterData: SessionFilterData;
  sessionsInfo: SessionsInfo;
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Session>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected globals: GlobalsService,
    protected sessionsService: SessionsService,
    protected toastr: ToastrService,
    private formattersHelper: FormattersHelper
  ) {
    const me = this;

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

    me.sessionsService.getSessionsInfo(me.sessionFilterData)
      .subscribe(sessionsInfo => {
        if (sessionsInfo) {
          me.sessionsInfo = sessionsInfo;
          me.rebuildForm();
        }
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
      dateTo: new FormControl('', [Validators.required]),
      sessions: new FormControl('', []),
      distance: new FormControl('', []),
      maxDistance: new FormControl('', []),
      medDistance: new FormControl('', []),
      time: new FormControl('', []),
      maxTime: new FormControl('', []),
      medTime: new FormControl('', []),
      vmax: new FormControl('', []),
      vmed: new FormControl('', [])
    },
    { updateOn: 'blur'});
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.patchValue({sessions: me.formattersHelper.decimalFormatter(me.sessionsInfo.sessions)});
    me.validatingForm.patchValue({distance: me.formattersHelper.decimalFormatter(me.sessionsInfo.distance)});
    me.validatingForm.patchValue({maxDistance: me.formattersHelper.decimalFormatter(me.sessionsInfo.maxDistance)});
    me.validatingForm.patchValue({medDistance: me.formattersHelper.decimalFormatter(me.sessionsInfo.medDistance)});
    me.validatingForm.patchValue({time: me.formattersHelper.secondsToTimeFormatter(me.sessionsInfo.time)});
    me.validatingForm.patchValue({maxTime: me.formattersHelper.secondsToTimeFormatter(me.sessionsInfo.maxTime)});
    me.validatingForm.patchValue({medTime: me.formattersHelper.secondsToTimeFormatter(me.sessionsInfo.medTime)});
    me.validatingForm.patchValue({vmax: me.formattersHelper.decimalFormatter(me.sessionsInfo.maxSpeed)});
    me.validatingForm.patchValue({vmed: me.formattersHelper.decimalFormatter(me.sessionsInfo.medSpeed)});
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
