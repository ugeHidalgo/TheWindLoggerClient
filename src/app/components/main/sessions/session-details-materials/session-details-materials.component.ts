import { Component, ViewChild } from '@angular/core';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { GlobalsService } from 'src/app/globals/globals.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Session } from 'src/app/models/session';
import { SessionMaterialsService } from 'src/app/services/sessionMaterials/session-materials.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-session-details-materials',
  templateUrl: './session-details-materials.component.html',
  styleUrls: ['./session-details-materials.component.scss']
})
export class SessionDetailsMaterialsComponent {

  selectedRowId: string = '-1';
  selectedSession : Session;
  selectedMaterial: SessionMaterial;
  materialsUsed: SessionMaterial[]
  displayedColumns: string[];
  displayedFooterColumns: string[];
  dataSource: MatTableDataSource<SessionMaterial>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private globals: GlobalsService,
    private toastr: ToastrService,
    private sessionMaterialsService: SessionMaterialsService
  ) { 
    const me = this;

    me.displayedColumns = ['materialName', 'materialType', 'time', 'distance','usePercentage'];
    me.selectedSession = me.globals.selectedSession;
    me.getMaterialsForSession(me.selectedSession.userName, me.selectedSession._id);
  }

  private getMaterialsForSession(userName: string, id: string): void {
    const me = this;

    me.globals.maskScreen();
    me.sessionMaterialsService.getSessionMaterials(userName, id)
      .subscribe(materialSessions => {
        me.materialsUsed = materialSessions;
        me.dataSource = new MatTableDataSource<SessionMaterial>(materialSessions);
        me.dataSource.paginator = me.paginator;
        me.dataSource.sort = me.sort;
        me.globals.unMaskScreen();
      },
      error => {
        me.globals.unMaskScreen();
        me.toastr.error(error.message);
      });
  }

  selectRow(row) {
    const me = this;

    me.selectedRowId = row._id;
    me.selectedMaterial = me.getSessionById(me.selectedRowId);
  }

  getSessionById(selectedRowId: string): SessionMaterial {
    return this.materialsUsed.find( function(x) { return x._id === selectedRowId; });
  }
}
