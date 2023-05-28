import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NbAlertModule } from '@nebular/theme';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule
  ]
})
export class LoginModule { }
