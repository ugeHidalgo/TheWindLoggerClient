import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from '../login/login/login.component';
import { RegisterComponent } from '../login/register/register.component';
import { ForgottenPasswordComponent } from '../login/forgotten-password/forgotten-password.component';
import { RecoverPasswordComponent } from '../login/recover-password/recover-password.component';
import { UserComponent } from '../login/user/user.component';

/* import { MainScreenComponent } from '../components/main/mainScreen/main-screen.component';
import { SpotsComponent } from '../components/main/spots/spots/spots.component';
import { MaterialTypesComponent } from '../components/main/materialTypes/material-types/material-types.component';
import { MaterialsComponent } from '../components/main/materials/materials/materials.component';
import { ImportDataComponent } from '../tools/import-data/import-data.component'; */
import { ComponentsRoutingModule } from '../components/components-routing.module';
import { PageNotFoundComponent } from '../components/main/notFound/not-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgottenPasswordComponent }, 
  { path: 'recover/:u/:p', component: RecoverPasswordComponent },
  { path: 'user', component: UserComponent },
 /*  { path: 'mainscreen', component: MainScreenComponent },
  { path: 'spots', component: SpotsComponent },
  { path: 'material-types', component: MaterialTypesComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'import-data', component: ImportDataComponent }, */
  { path: '', redirectTo: 'mainscreen', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    //LoginRoutingModule,
    ComponentsRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class GlobalRoutingModule { }