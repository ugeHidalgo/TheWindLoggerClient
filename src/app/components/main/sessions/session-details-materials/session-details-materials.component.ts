import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SessionMaterialDialogComponent } from 'src/app/components/dialogs/session-material-dialog/session-material-dialog/session-material-dialog.component';

@Component({
  selector: 'app-session-details-materials',
  templateUrl: './session-details-materials.component.html',
  styleUrls: ['./session-details-materials.component.scss']
})
export class SessionDetailsMaterialsComponent implements OnInit{

  @Input() materialsUsed: SessionMaterial[];
  @Input() dataSource: MatTableDataSource<SessionMaterial>;

  selectedRowId: string = '-1';
  selectedMaterial: SessionMaterial;
  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { 
    const me = this;

    me.displayedColumns = ['materialName', 'materialType', 'time', 'distance','usePercentage'];
  }

  ngOnInit() {
    const me = this;

    me.dataSource.paginator = me.paginator;
    me.dataSource.sort = me.sort;
  }

  selectRow(row) {
    const me = this;

    me.selectedRowId = row._id;
    me.selectedMaterial = me.getSessionById(me.selectedRowId);
  }

  getSessionById(selectedRowId: string): SessionMaterial {
    return this.dataSource.data.find( function(x) { return x._id === selectedRowId; });
  }

  onAddSessionMaterial() {
    this.toastr.warning('To be implemented.');
  }

  onEditSessionMaterial() {
    const me = this;
    let dialogRef;

    if (me.selectedRowId==='-1') {
      me.toastr.error('Debe seleccionar el material a editar.');
      return;
    }

    dialogRef = me.dialog.open(SessionMaterialDialogComponent, {
        width: '450px',
        data: me.selectedMaterial
      });
  }

  onDeleteSessionMaterial() {
    this.toastr.warning('To be implemented.');
  }

}
