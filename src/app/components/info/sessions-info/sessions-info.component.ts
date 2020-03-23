import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals/globals.service';
import { SessionFilterData } from 'src/app/models/sessionFilterData';
import * as moment from 'moment';

@Component({
  selector: 'app-sessions-info',
  templateUrl: './sessions-info.component.html',
  styleUrls: ['./sessions-info.component.scss']
})
export class SessionsInfoComponent implements OnInit {

  userName: string;
  validatingForm: FormGroup;
  sessionFilterData: SessionFilterData

  constructor(
    protected globals: GlobalsService
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

  onDateFromChanged() {
    
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

  getDateFrom(): Date {
    const me = this,
          formModel = me.validatingForm.value;

    return formModel.dateFrom;
  }

  writeDateFromInForm() {
    const me = this;

    me.validatingForm.patchValue({dateFrom: me.sessionFilterData.dateFrom })
  }

  getDateTo(): Date {
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
