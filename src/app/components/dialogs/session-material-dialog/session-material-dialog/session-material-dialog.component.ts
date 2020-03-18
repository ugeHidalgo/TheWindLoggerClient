import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Material } from 'src/app/models/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormattersHelper } from 'src/app/tools/formaters.helper';
import { ValidationMessagesList } from 'src/app/tools/validationMessages.list';
import { ValidateTime } from 'src/app/validators/time.validator';
import { SessionMaterialDialogData } from './session-material-dialog.data';
import { ToastrService } from 'ngx-toastr';

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

    me.getFormData();
    me.dialogRef.close(me.data.sessionMaterial);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onMaterialChanged(selection: any): void {
    const me = this,
          selectedMaterialName = selection.value,
          material = me.getMaterialByName(selectedMaterialName);
    let  materialTypeName = '';

    if (material && material.materialType) {
      materialTypeName = material.materialType.name;
    }
    me.validatingForm.get('materialType').setValue(materialTypeName);
  }

  onUsePercentageChanged(usePercentage: any): void {
    const me = this,
          percentValue = usePercentage.target.valueAsNumber;

    if (percentValue > 100) {
      return;
    }

    me.setFieldValue('distance', percentValue, me.data.sessionDistance);
    me.setFieldValue('time', percentValue, me.data.sessionTime);
  }

  onTimeChanged(distance: any): void {
    const me = this;
    let timeValue = me.formattersHelper.timeToSecondsFormatter(distance.target.value),
        formattedValue;

    if (timeValue > me.data.sessionTime) {
      timeValue = me.data.sessionTime;
      formattedValue = me.formattersHelper.secondsToTimeFormatter(me.data.sessionTime);
      me.validatingForm.get('time').setValue(formattedValue);
      me.toastr.warning('No se puede sobrepasar el tiempo de la sessión.');
    }

    me.setPercentageFieldValue(timeValue, me.data.sessionTime);
    me.setFieldValue('distance', me.validatingForm.value.usePercentage, me.data.sessionDistance);
  }

  onDistanceChanged(distance: any): void {
    const me = this;
    let distanceValue = distance.target.valueAsNumber;

    if (distanceValue > me.data.sessionDistance) {
      distanceValue = me.data.sessionDistance;
      me.validatingForm.get('distance').setValue(me.data.sessionDistance);
      me.toastr.warning('No se puede sobrepasar la distancia de la sessión.');
    }

    me.setPercentageFieldValue(distanceValue, me.data.sessionDistance);
    me.setFieldValue('time', me.validatingForm.value.usePercentage, me.data.sessionTime);
  }

  setFieldValue(fieldName, value, totalValue) {
    const me = this;
    let newValue =  value * totalValue / 100, 
        formattedValue: any;

    if (fieldName === 'distance') {
      formattedValue = me.formattersHelper.decimalFormatter(newValue);
    }

    if (fieldName === 'time') {
      formattedValue = me.formattersHelper.secondsToTimeFormatter(newValue);
    }

    me.validatingForm.get(fieldName).setValue(formattedValue);
  }

  setPercentageFieldValue(value, totalValue) {
    const me = this;  
    let newValue=  value * 100 / totalValue, 
        formattedValue: any;

    formattedValue = me.formattersHelper.decimalFormatter(newValue, "1.0-0");
    me.validatingForm.get('usePercentage').setValue(formattedValue);
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      material: new FormControl('', [Validators.required]),
      materialType:  new FormControl('', []),
      time: new FormControl('', { validators: Validators.compose([Validators.required, ValidateTime])}),
      distance: new FormControl('', { validators: Validators.compose([Validators.required, Validators.min(0)])}),
      usePercentage: new FormControl('', { validators: Validators.compose([Validators.required, Validators.max(100), Validators.min(1)])})
    },
    { updateOn: 'blur'});
  }

  rebuildForm() {
    const me = this,
          materialName = me.data.sessionMaterial.material && me.data.sessionMaterial.material.name ? 
                         me.data.sessionMaterial.material.name : '',
          materialTypeName = me.data.sessionMaterial.material && me.data.sessionMaterial.material.materialType && 
                             me.data.sessionMaterial.material.materialType.name ? 
                             me.data.sessionMaterial.material.materialType.name : '';

    me.validatingForm.setValue({
      material: materialName,
      materialType: materialTypeName,
      time: me.formattersHelper.secondsToTimeFormatter(me.data.sessionMaterial.time),
      distance: me.formattersHelper.decimalFormatter(me.data.sessionMaterial.distance),
      usePercentage: me.formattersHelper.decimalFormatter(me.data.sessionMaterial.usePercentage, '1.0-0')
    });
  }

  getFormData(): void {
    const me = this,
          formModel = me.validatingForm.value;

    me.data.sessionMaterial.material = me.getMaterialByName(formModel.material);
    me.data.sessionMaterial.materialName = formModel.material;
    me.data.sessionMaterial.materialTypeName = formModel.materialType;
    me.data.sessionMaterial.time =  me.formattersHelper.timeToSecondsFormatter(formModel.time);
    me.data.sessionMaterial.distance = formModel.distance;
    me.data.sessionMaterial.usePercentage = formModel.usePercentage;
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
