import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from '../login/login/login.component';
import { RegisterComponent } from '../login/register/register.component';
import { ForgottenPasswordComponent } from '../login/forgotten-password/forgotten-password.component';
import { RecoverPasswordComponent } from '../login/recover-password/recover-password.component';

import { MainScreenComponent } from '../components/main/mainScreen/main-screen.component';
import { UserComponent } from '../login/user/user.component';

import { PageNotFoundComponent } from '../components/main/notFound/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgottenPasswordComponent }, 
  { path: 'recover/:u/:p', component: RecoverPasswordComponent },
  { path: 'user', component: UserComponent },
  { path: 'mainscreen', component: MainScreenComponent },
  { path: '', redirectTo: 'mainscreen', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    //LoginRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class GlobalRoutingModule { }