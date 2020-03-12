import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Material } from 'src/app/models/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormattersHelper } from 'src/app/tools/formaters.helper';
import { ValidationMessagesList } from 'src/app/tools/validationMessages.list';
import { ValidateTime } from 'src/app/validators/time.validator';
import { SessionMaterialDialogData } from './session-material-dialog.data';

@Component({
  selector: 'app-session-material-dialog',
  templateUrl: './session-material-dialog.component.html',
  styleUrls: ['./session-material-dialog.component.scss']
})
export class SessionMaterialDialogComponent implements OnInit {
  userName: string;
  validatingForm: FormGroup;
  validationMessages = ValidationMessagesList.messages;

  constructor(
    private toastr: ToastrService,
    protected globals: GlobalsService,
    private formattersHelper: FormattersHelper,
    public dialogRef: MatDialogRef<SessionMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionMaterialDialogData,
  ) { 
    const me = this;

    me.globals.maskScreen();
    me.userName = me.globals.userNameLogged;
    me.createForm();
  }

  ngOnInit() {
    const me = this;

    me.rebuildForm();
    me.globals.unMaskScreen();
  }

  onOkClick(): void {
    const me = this;

    me.data.sessionMaterial = me.getFormData();
    me.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      material: new FormControl('', [Validators.required]),
      time: new FormControl('', { validators: Validators.compose([Validators.required, ValidateTime])}),
      distance: new FormControl('', [Validators.required]),
      usePercentage: new FormControl('', { validators: Validators.compose([Validators.required, Validators.max(100), Validators.min(1)])})
    },
    { updateOn: 'blur'});
  }

  rebuildForm() {
    const me = this,
          materialName = me.data.sessionMaterial.material && me.data.sessionMaterial.material.name ? 
                          me.data.sessionMaterial.material.name : '';

    me.validatingForm.setValue({
      material: materialName,
      time: me.formattersHelper.secondsToTimeFormatter(me.data.sessionMaterial.time),
      distance: me.formattersHelper.decimalFormatter(me.data.sessionMaterial.distance),
      usePercentage: me.formattersHelper.decimalFormatter(me.data.sessionMaterial.usePercentage, '1.0-0')
    });
  }

  getFormData(): SessionMaterial {
    const me = this,
          formModel = me.validatingForm.value,
          newSessionMaterial: SessionMaterial = me.data.sessionMaterial;

    newSessionMaterial.material = me.getMaterialByName(formModel.material);
    newSessionMaterial.time =  me.formattersHelper.timeToSecondsFormatter(formModel.time);
    newSessionMaterial.distance = formModel.distance;
    newSessionMaterial.usePercentage = formModel.usePercentage;

    return newSessionMaterial;
  }

  getMaterialByName(name): Material {
    return this.data.materials.find( function(x) { return x.name === name; });
  }

  isInvalidField(fieldName: string, validationType: string): boolean {
    const me = this;

    if (!me.validatingForm.get(fieldName)) {
      return false;
    }

    return me.validatingForm.get(fieldName).hasError(validationType);
  }
}
