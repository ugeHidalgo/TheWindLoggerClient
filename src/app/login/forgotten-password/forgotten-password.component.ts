import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})

export class ForgottenPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  userName: string = "";
  email: string = "";

  validation_messages = {
    'userName': [
      { type: 'required', message: 'El nombre de usuario es necesario.'}
    ],
    'email': [
      { type: 'required', message: 'El correo electrónico del usuario es necesario.'},
      { type: 'email', message: 'Correo electrónico no válido.'}
    ]
  }

  ngOnInit() {
    this.userName = "";
    this.email = "";
  }

  constructor(
    private router: Router,
    private routeLocation: Location,
    public toastr: ToastrService,
    private userService: UsersService) {
    this.createForm();
  }

  createForm() {
    const me = this;

    me.forgotForm = new FormGroup({
      userName: new FormControl ('', [Validators.required]),
      email: new FormControl ('', {validators: Validators.compose([Validators.required, Validators.email])})
      },
      {updateOn: 'blur'}
    );
  }

  close() {
    this.routeLocation.back();
  }

  onResetPassword() {
    const me = this,
          user = new User();

    me.getFormData();
    user.userName = me.userName;
    user.eMail = me.email;

    if (!me.forgotForm.invalid) {
      me.userService.sendUserPasswordRecoverMail(user)
        .subscribe( result => {
          if (result) {
            me.toastr.success(`Hemos enviado un correo a su cuenta(si existe en nuestra base de datos) para recuperar la contraseña.`);
            me.router.navigate(['/login']);
          } else {
            me.toastr.error('Un problema impidió recuperar la contraseña. Por favor, inténtelo de nuevo.');
          }
      });
    }
  }

  getFormData = (): any => {
    const me = this,
          formModel = me.forgotForm.value;

    me.userName = formModel.userName;
    me.email = formModel.email;
  }

  isInvalidField( fieldName: string, validationType: string) {
    const me = this;

    if (!me.forgotForm.get(fieldName)) {
      return false;
    }

    return me.forgotForm.get(fieldName).hasError(validationType);
  }
}
