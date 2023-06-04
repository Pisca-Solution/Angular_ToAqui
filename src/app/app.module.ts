import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbTimepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { PainelModule } from './painel/painel.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot(),
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NgxSpinnerModule,
    HttpClientModule,
    LoginModule,
    PainelModule,
    ModalModule.forRoot(),
    NbCardModule,
    NbTimepickerModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
