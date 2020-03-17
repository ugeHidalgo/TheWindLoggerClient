import { Component, ViewChild, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SessionMaterialDialogComponent } from 'src/app/components/dialogs/session-material-dialog/session-material-dialog/session-material-dialog.component';
import { Material } from 'src/app/models/material';
import { DeleteDialogComponent } from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { GlobalsService } from 'src/app/globals/globals.service';

@Component({
  selector: 'app-session-details-materials',
  templateUrl: './session-details-materials.component.html',
  styleUrls: ['./session-details-materials.component.scss']
})
export class SessionDetailsMaterialsComponent implements OnInit{

  @Input() materials: Material[];
  @Input() dataSource: MatTableDataSource<SessionMaterial>;

  @Output() updatedSessionDetailMaterials = new EventEmitter();

  selectedRowId: string = '-1';
  selectedMaterial: SessionMaterial;
  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    protected globals: GlobalsService
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
    const me = this;
    let dialogRef,
        newSessionMaterial = new SessionMaterial();
      
    newSessionMaterial.session = me.globals.selectedSession._id;
    newSessionMaterial.userName = me.globals.userNameLogged;
    newSessionMaterial.time = 0;
    newSessionMaterial.distance =0;

    dialogRef = me.dialog.open(SessionMaterialDialogComponent, {
        width: '450px',
        data: { sessionMaterial: newSessionMaterial, materials: me.materials }
      });
      dialogRef.afterClosed().subscribe(sessionMaterial => {
        if (sessionMaterial) {
          me.dataSource.data.push(sessionMaterial);
          me.updatedSessionDetailMaterials.emit(me.dataSource.data)
        }
      });
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
        data: { sessionMaterial: me.selectedMaterial, materials: me.materials }
      });
      dialogRef.afterClosed().subscribe(hasChanges => {
        if (hasChanges) {
          me.updatedSessionDetailMaterials.emit()
        }
      });
  }

  onDeleteSessionMaterial() {
    const me = this;
    let dialogRef;

    if (me.selectedRowId==='-1') {
      me.toastr.error('Debe seleccionar un material para borrar.');
      return;
    }

    dialogRef = me.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: {
          title: 'Confirmar',
          message: 'Va a borrar el material selecciopnado. ¿Está seguro?'
        }
      });
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          me.onDeleteConfirmed();
        }
      });
  }

  onDeleteConfirmed() {
    const me = this,
          index = me.dataSource.data.findIndex(x=>x._id === me.selectedRowId);

    if (index !== -1) {
      me.dataSource.data.splice(index, 1);
      me.updatedSessionDetailMaterials.emit(me.dataSource.data);
    }
  }

}
