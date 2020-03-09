import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Observable, forkJoin } from 'rxjs';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { ToastrService } from 'ngx-toastr';
import { Sport } from 'src/app/models/sport';
import { Spot } from 'src/app/models/spot';
import { SportsService } from 'src/app/services/sports/sports.service';
import { SpotsService } from 'src/app/services/spots/spots.service';
import { SessionMaterialsService } from 'src/app/services/sessionMaterials/session-materials.service';
import { SessionMaterial } from 'src/app/models/sessionMaterial';

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
  sessionMaterials: SessionMaterial[];
  validatingForm: FormGroup;

  constructor(
    //private location : Location,
    private route : ActivatedRoute,
    protected globals: GlobalsService,
    //private sessionsService: SessionsService,
    private sportsService: SportsService,
    private spotsService: SpotsService,
    private sessionMaterialsService: SessionMaterialsService,
    private toastr: ToastrService
  ) {
    const me = this;
    me.globals.maskScreen();
    me.createForm();
  }

  ngOnInit() {
    const me = this;

    me.sessionId = me.route.snapshot.paramMap.get('id');
    me.session = me.globals.selectedSession;
    me.setScreenTitle();
    me.userName = me.globals.userNameLogged;
    me.loadInitialData().subscribe(([sports, spots, materials]) => {
      me.sports = sports;
      me.spots = spots;
      me.sessionMaterials = materials;
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
      me.title ='Nuevo sesión';
    } else {
      me.title ='Editar sesión';
    }
  }

  loadInitialData(): Observable<any> {
    const me = this;
    let sports = me.sportsService.getActiveSports(me.userName),
        spots = me.spotsService.getActiveSpots(me.userName),
        sessionMaterials = me.sessionMaterialsService.getSessionMaterials(me.userName, me.sessionId);

    return forkJoin([sports, spots, sessionMaterials]);
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      sessionDate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.maxLength(80)]),
      description: new FormControl('', [Validators.maxLength(150)]),
      sessionTime: new FormControl('', [Validators.required]),
      sessionDistance: new FormControl('', [Validators.required]),
      sport: new FormControl('', [Validators.required]),
      spot: new FormControl('', []),
      race: new FormControl('', []),
      indoor: new FormControl('', []),
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
      description: me.session.description,
      sessionDate: me.session.sessionDate,
      sessionTime: me.session.sessionTime,
      sessionDistance: me.session.sessionDistance,
      sport: sportName,
      spot: spotName,
      race: me.session.race,
      indoor: me.session.indoor,
      value: me.session.value,
      effort: me.session.effort,
      maxSpeed: me.session.maxSpeed,
      medSpeed: me.session.medSpeed,
      maxPower: me.session.maxPower,
      medPower: me.session.medPower
    });
  }
 
}