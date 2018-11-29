import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressBar, MatButton, MatSnackBar, MatDialogRef, MatDialog} from '@angular/material';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AuthGuard} from '../../../shared/servicios/auth/auth.guard';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: []
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(
    private crudService: CrudService,
    private authGuard: AuthGuard,
    private dialog: MatDialog,
    private snack: MatSnackBar,) {

  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  signin() {
    const signinData = this.signinForm.value;

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    let origin = window.location.origin;
    // ENTRAR

    this.crudService.login('oauth/token', {
      grant_type: 'password',
      scope: '*',
      client_id: '2',
      client_secret: 'oUIkcYefAsgTPCl6En3CUvbOZdibmeg4nWvVjVfz',
      username: signinData.username,
      password: signinData.password
    }).subscribe(data => {

        if (data.access_token) {
          localStorage.setItem('authToken', data.access_token);
          localStorage.setItem('tokenType', data.token_type);
          return window.location.href = `${ origin }/dashboard/`;

        }
      },
      error => {
        this.snack.open('Credenciales Incorrectas!', 'OK', {duration: 4000});
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
      }
      ,);
  }
}


