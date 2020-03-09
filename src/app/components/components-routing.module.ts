import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainScreenComponent } from './main/mainScreen/main-screen.component';
import { SpotsComponent } from './main/spots/spots/spots.component';
import { MaterialTypesComponent } from './main/materialTypes/material-types/material-types.component';
import { MaterialsComponent } from './main/materials/materials/materials.component';
import { ImportDataComponent } from '../tools/import-data/import-data.component';
import { SessionsComponent } from './main/sessions/sessions/sessions.component';
import { SportsComponent } from './main/sports/sports/sports.component';
import { SportTypesComponent } from './main/sportTypes/sport-types/sport-types.component';
import { SessionDetailsComponent } from './main/sessions/session-details/session-details.component';

const componentRoutes: Routes = [
    { path: 'mainscreen', component: MainScreenComponent },
    { path: 'spots', component: SpotsComponent },
    { path: 'sport-types', component: SportTypesComponent },
    { path: 'sports', component: SportsComponent },
    { path: 'sessions', component: SessionsComponent },
    { path: 'session-details/:id', component: SessionDetailsComponent },
    { path: 'material-types', component: MaterialTypesComponent },
    { path: 'materials', component: MaterialsComponent },
    { path: 'import-data', component: ImportDataComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(componentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsRoutingModule { }