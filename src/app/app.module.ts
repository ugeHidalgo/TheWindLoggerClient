import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Locale
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import loacaleEs from '@angular/common/locales/es'
registerLocaleData(loacaleEs);

// External libraries
import { ToastrModule } from 'ngx-toastr'; // Toaster library used to messaging
import * as toastrCustomOptions from './messages/toastrCustomOptions';

import { AppComponent } from './app.component';
import { GlobalRoutingModule } from './globals/global-routing.module';
import { MyMaterialModule } from './globals/material.module';

import { SecondsToTimePipe } from './pipes/secondsToTimePipe';

import { UsersService } from './services/users/users.service';
import { GlobalsService } from './globals/globals.service';
import { MainScreenComponent } from './components/main/mainScreen/main-screen.component';
import { UserComponent } from './login/user/user.component';

import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { ForgottenPasswordComponent } from './login/forgotten-password/forgotten-password.component';
import { RecoverPasswordComponent } from './login/recover-password/recover-password.component';

import { PageNotFoundComponent } from './components/main/notFound/not-found.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';

import { MaterialTypesComponent } from './components/main/materialTypes/material-types/material-types.component';
import { MaterialsComponent } from './components/main/materials/materials/materials.component';
import { SpotsComponent } from './components/main/spots/spots/spots.component';
import { SessionsComponent } from './components/main/sessions/sessions/sessions.component';
import { ImportDataComponent } from './tools/import-data/import-data.component';
import { SportsComponent } from './components/main/sports/sports/sports.component';
import { SportTypesComponent } from './components/main/sportTypes/sport-types/sport-types.component';
import { SessionDetailsComponent } from './components/main/sessions/session-details/session-details.component';
import { SportsService } from './services/sports/sports.service';
import { SpotsService } from './services/spots/spots.service';
import { FormattersHelper } from './tools/formaters.helper';
import { SessionDetailsMaterialsComponent } from './components/main/sessions/session-details-materials/session-details-materials.component';
import { SessionMaterialDialogComponent } from './components/dialogs/session-material-dialog/session-material-dialog/session-material-dialog.component';
import { MainFooterComponent } from './components/main/mainFooter/main-footer/main-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainScreenComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    DeleteDialogComponent,
    SessionMaterialDialogComponent,
    ForgottenPasswordComponent,
    RecoverPasswordComponent,
    MaterialTypesComponent,
    MaterialsComponent,
    SpotsComponent,
    SessionsComponent,
    SessionDetailsComponent,
    SessionDetailsMaterialsComponent,
    ImportDataComponent,
    SportsComponent,
    SportTypesComponent,
    SecondsToTimePipe,
    MainFooterComponent
  ],
  imports: [
    GlobalRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    ToastrModule.forRoot(toastrCustomOptions.CustomOptions)
  ],
  providers: [
    GlobalsService,
    SportsService,
    SpotsService,
    UsersService,
    Location,
    FormattersHelper,
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  entryComponents: [
    DeleteDialogComponent,
    SessionMaterialDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
