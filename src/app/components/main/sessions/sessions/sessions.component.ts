import { Component, ViewChild } from '@angular/core';
import { Session } from 'src/app/models/session';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {

  selectedRowId: string = '-1';
  userName: string;
  selectedSession: Session;
  sessions: Session[];
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<Session>;

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

    me.displayedColumns = ['sessionDate', 'name', 'sportName', 'spotName', 'sessionTime', 'sessionDistance','maxSpeed', 'medSpeed', 'value'];
    me.userName = me.globals.userNameLogged;
    me.getSessionsForCompany(me.userName);
  }

  private getSessionsForCompany(userName: string): void {
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
    const pathToAccountDetail = `/session-details/` + this.selectedRowId;

    this.router.navigate([pathToAccountDetail]);
  }

  onClickRemoveButton() {
    this.toastr.warning('To be implemented.');
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


