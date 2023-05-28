import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../shared/services/alert-service/alert-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ProfessorService } from '../painel/pages/home/service/professor/professor.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    senha: [null, [Validators.required]],
  });

  showPassword: boolean = false;
  erroLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alerta: AlertService,
    private authService: LoginService,
    private professorService: ProfessorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.form.valid) {
      this.spinner.show();

      this.erroLogin = false;

      this.authService.login(this.form.value)
        .pipe(
          take(1)
        )
        .subscribe(async(response: any) => {
          this.spinner.hide();

          if(response.perfil === "Aluno"){
            this.alerta.error('Falha ao realizar login. Tente novamente mais tarde!');
          }else{
            localStorage.setItem('role', response.perfil);
            localStorage.setItem('token', response.token);
            localStorage.setItem('classID', response.classId);

            await this.buscaDadosUsuario(response.classId);

            window.document.location.href = "/painel/chamada-qrcode";
          }
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();

          if (error.status === undefined)
            this.alerta.error('Falha ao realizar login. Tente novamente mais tarde!');
          else if (error.status === 400)
            this.erroLogin = true;
          else
            this.alerta.error(error);
        });
    }
  }

  async buscaDadosUsuario(id: number){
    this.spinner.show();

    await this.professorService.buscaDadosUsuario(id)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            localStorage.setItem('perfil', JSON.stringify(response));
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.alerta.error(error);
        });
    }
}
