import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Observable, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Session } from 'src/app/models/session';
import { Sport } from 'src/app/models/sport';
import { Spot } from 'src/app/models/spot';
import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { SportsService } from 'src/app/services/sports/sports.service';
import { SpotsService } from 'src/app/services/spots/spots.service';
import { SessionMaterialsService } from 'src/app/services/sessionMaterials/session-materials.service';
import { FormattersHelper } from 'src/app/tools/formaters.helper';
import { MatTableDataSource } from '@angular/material';
import { Material } from 'src/app/models/material';
import { MaterialsService } from 'src/app/services/materials/materials-service.service';
import { ValidateTime } from 'src/app/validators/time.validator';
import { ValidationMessagesList } from 'src/app/tools/validationMessages.list';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { ɵAnimationGroupPlayer } from '@angular/animations';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})

export class SessionDetailsComponent implements OnInit {

  sessionId: string;
  title: string;
  userName: string;
  session: Session;
  sports: Sport[];
  spots: Spot[];
  materials: Material[];
  dataSource: MatTableDataSource<SessionMaterial>;
  materialsLoaded: boolean = false;
  validatingForm: FormGroup;
  validationMessages = ValidationMessagesList.messages;
  hasChangedMaterials:boolean = false;

  constructor(
    private location : Location,
    private route : ActivatedRoute,
    protected globals: GlobalsService,
    private sportsService: SportsService,
    private spotsService: SpotsService,
    private sessionsService: SessionsService,
    private sessionMaterialsService: SessionMaterialsService,
    private materialsService: MaterialsService,
    private toastr: ToastrService,
    private formattersHelper: FormattersHelper
  ) {
    const me = this;

    me.globals.maskScreen();
    me.createForm();
    me.sessionId = me.route.snapshot.paramMap.get('id');
    me.session = me.globals.selectedSession;
    me.setScreenTitle();
    me.userName = me.globals.userNameLogged;
  }

  ngOnInit() {
    const me = this;

    me.materialsLoaded = false;
    me.hasChangedMaterials = false;
    me.loadInitialData().subscribe(([sports, spots, materials, sessionMaterials]) => {
      me.sports = sports;
      me.spots = spots;
      me.materials = materials;
      me.dataSource = new MatTableDataSource<SessionMaterial>(sessionMaterials);
      me.materialsLoaded = true;
      me.rebuildForm();
      me.globals.unMaskScreen();
    },
    error => {
      me.globals.unMaskScreen();
      me.toastr.error(error.message);
    });
  }

  //Private methods
  setScreenTitle(): void {
    const me = this;

    if (me.sessionId === '-1'){
      me.title ='Nueva sesión';
    } else {
      me.title ='Editar sesión';
    }
  }

  loadInitialData(): Observable<any> {
    const me = this;
    let sports = me.sportsService.getActiveSports(me.userName),
        spots = me.spotsService.getActiveSpots(me.userName),
        sessionMaterials = me.sessionMaterialsService.getSessionMaterials(me.userName, me.sessionId),
        materials = me.materialsService.getMaterials(me.userName);

    return forkJoin([sports, spots, materials, sessionMaterials]);
  }

  onClickGoBackButton() {
    this.location.back();
  }

  onClickUndoButton() {
    const me = this;

    me.globals.maskScreen();
    me.ngOnInit();
  }

  onClickSaveButton() {
    const me = this;

    me.globals.maskScreen();
    me.session = me.getFormData();
    me.session.materialsUsed = me.dataSource.data;
    me.sessionsService.saveSession(me.session).subscribe(
      (savedSession) => {
        if (!savedSession) {
          me.globals.unMaskScreen();
          me.toastr.error('No se pudo grabar la sesión. Inténtelo de nuevo.');
        } else {
          me.hasChangedMaterials = false;
          me.materialsLoaded = false;
          me.sessionMaterialsService.getSessionMaterials(me.userName, me.sessionId).subscribe( (sessionMaterials) => {
            me.dataSource = new MatTableDataSource<SessionMaterial>(sessionMaterials);
            me.materialsLoaded = true;
            me.validatingForm.reset();
            me.rebuildForm();
            me.globals.unMaskScreen();
            me.toastr.success(`Sesión ${savedSession.name} guardada correctamente.`);
          });
        }
      });
  }

  onChangedDistance(value: any) {
    const me = this,
          sessionDistance = value.target.valueAsNumber,
          materials = me.dataSource.data;
    materials.forEach(material=>{
      material.distance = material.usePercentage  * sessionDistance / 100;
    });
    me.dataSource = new MatTableDataSource<SessionMaterial>(materials);
  }

  onChangedTime(value: any) {
    const me = this,
          sessionTime =  me.formattersHelper.timeToSecondsFormatter(value.target.value),
          materials = me.dataSource.data;
    materials.forEach(material=>{
      material.time = material.usePercentage  * sessionTime / 100;
    });
    me.dataSource = new MatTableDataSource<SessionMaterial>(materials);
  }

  // Custom events
  onUpdatedSessionDetailMaterials(sessionMaterials: SessionMaterial[]): void {
    const me = this;

    if (sessionMaterials) {
      me.dataSource = new MatTableDataSource<SessionMaterial>(sessionMaterials);
    }
    me.hasChangedMaterials = true;
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      name: new FormControl('',  { validators: Validators.compose([Validators.maxLength(50),Validators.required])}),
      description: new FormControl('', [Validators.maxLength(100)]),
      time: new FormControl('', { validators: Validators.compose([Validators.required, ValidateTime])}),
      distance: new FormControl('', { validators: Validators.compose([Validators.required, Validators.max(9999), Validators.min(0)])}),
      sport: new FormControl('', [Validators.required]),
      spot: new FormControl('', []),
      race: new FormControl('', { validators:[], updateOn: 'change'}),
      indoor: new FormControl('', { validators:[], updateOn: 'change'}),
      value: new FormControl('', { validators: Validators.compose([Validators.max(10), Validators.min(1)])}),
      effort: new FormControl('', { validators: Validators.compose([Validators.max(10), Validators.min(1)])}),
      maxSpeed: new FormControl('', { validators: Validators.compose([Validators.max(200), Validators.min(0)])}),
      medSpeed: new FormControl('', []),
      maxPower: new FormControl('', { validators: Validators.compose([Validators.max(9999), Validators.min(0)])}),
      medPower: new FormControl('', { validators: Validators.compose([Validators.max(9999), Validators.min(0)])})
    },
    { updateOn: 'blur'});
  }

  rebuildForm() {
    const me = this,
          sportName = me.session.sport && me.session.sport.name ? me.session.sport.name : '',
          spotName = me.session.spot && me.session.spot.name ? me.session.spot.name : '';

    me.validatingForm.setValue({
      name: me.session.name,
      description: me.session.description ? me.session.description : '',
      date: me.session.sessionDate,
      time: me.formattersHelper.secondsToTimeFormatter(me.session.sessionTime),
      distance: me.formattersHelper.decimalFormatter(me.session.sessionDistance),
      sport: sportName,
      spot: spotName,
      race: me.session.race,
      indoor: me.session.indoor,
      value: me.session.value,
      effort: me.session.effort,
      maxSpeed: me.formattersHelper.decimalFormatter(me.session.maxSpeed, '1.3-3'),
      medSpeed: me.formattersHelper.decimalFormatter(me.session.medSpeed, '1.3-3'),
      maxPower: me.formattersHelper.decimalFormatter(me.session.maxPower),
      medPower: me.formattersHelper.decimalFormatter(me.session.medPower)
    });
  }

  getFormData(): Session {
    const me = this,
          formModel = me.validatingForm.value,
          newSession: Session = me.session;

    newSession.name = formModel.name;
    newSession.description = formModel.description;
    newSession.sessionDate = formModel.date;
    newSession.sessionTime =  me.formattersHelper.timeToSecondsFormatter(formModel.time);
    newSession.sessionDistance = formModel.distance;
    newSession.sport = me.getSportByName(formModel.sport);
    newSession.spot = me.getSpotByName(formModel.spot);
    newSession.race = formModel.race;
    newSession.indoor = formModel.indoor;
    newSession.value = formModel.value;
    newSession.effort = formModel.effort;
    newSession.maxSpeed = formModel.maxSpeed;
    newSession.maxPower = formModel.maxPower;
    newSession.medPower = formModel.medPower;

    return newSession;
  }

  getDistanceInForm(): Number {
    const me = this,
          formModel = me.validatingForm.value;

    return formModel.distance ==='' ? 0 : formModel.distance;
  }

  getTimeInForm(): Number {
    const me = this,
          formModel = me.validatingForm.value;

    return  me.formattersHelper.timeToSecondsFormatter(formModel.time);
  }

  getSportByName(name): Sport {
    return this.sports.find( function(x) { return x.name === name; });
  }

  getSpotByName(name): Spot {
    return this.spots.find( function(x) { return x.name === name; });
  }

  isInvalidField(fieldName: string, validationType: string): boolean {
    const me = this;

    if (!me.validatingForm.get(fieldName)) {
      return false;
    }

    return me.validatingForm.get(fieldName).hasError(validationType);
  }
}