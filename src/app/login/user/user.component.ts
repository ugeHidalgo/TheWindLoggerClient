import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals/globals.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title: string;
  user: User;
  userName: string;
  company: string;
  validatingForm: FormGroup;
  validation_messages = {
    'firstName': [
      { type: 'required', message: 'El nombre es obligatorio.'}
    ],
    'company': [
      { type: 'required', message: 'La compañia es obligatoria.'}
    ],
    'email': [
      { type: 'required', message: 'El mail es obligatorio.'},
      { type: 'email', message: 'No es una dirección de correo válida'}
    ]
  };

  constructor(
    private location : Location,
    private route : ActivatedRoute,
    protected globals: GlobalsService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    const me = this;
    me.globals.maskScreen();
    me.createForm();
  }

  ngOnInit() {
    const me = this;
    me.userName = me.globals.userNameLogged;
    me.company = me.globals.getCompany();
    me.setScreenTitle();
    me.loadInitialData().subscribe(([user]) => {
      me.user = user;
      me.rebuildForm();
      me.globals.unMaskScreen();
    },
    error => {
      me.globals.unMaskScreen();
      me.toastr.error(error.message);
    });
  }

  loadInitialData(): Observable<any> {
    const me = this;
    let user = me.usersService.getUser(me.userName);

    return forkJoin([user]);
  }

  setScreenTitle(): void {
    const me = this;
    this.title = me.userName;
  }

  onClickGoBackButton() {
    this.location.back();
  }

  onClickSaveButton(): void {
    const me = this;

    if (me.validatingForm.invalid) {
      me.toastr.error('Hay errores en pantalla. Corríjalos antes de salvar.');
      return;
    }

    me.globals.maskScreen();
    me.user = me.getFormData();
    me.usersService.updateUser(me.user)
      .subscribe( (updatedUser) => {
          if (updatedUser) {
            me.globals.unMaskScreen();
            me.toastr.success('Usuario guardado correctamente.');
          } else {
            me.globals.unMaskScreen();
            me.toastr.error('No se puedo guardar el usuario. Inténtelo de nuevo.');
          }
        }
      );
    me.rebuildForm();
  }

  onClickUndoButton() {
    this.rebuildForm();
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = new FormGroup({
      userName: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', []),
      eMail: new FormControl('', [Validators.email, Validators.required]),
      company: new FormControl('', [Validators.required])
    },
    { updateOn: 'blur'});
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.setValue({
      userName: me.user.userName,
      firstName: me.user.firstName,
      lastName: me.user.lastName,
      eMail: me.user.eMail,
      company: me.user.company
    });
  }

  getFormData(): User {
    const me = this,
          formModel = me.validatingForm.value,
          updatedUser: User = me.user;

    updatedUser.firstName = formModel.firstName;
    updatedUser.lastName = formModel.lastName;
    updatedUser.eMail = formModel.eMail;
    updatedUser.company = formModel.company;

    return updatedUser;
  }
}
