import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodePageComponent } from './QrCodePage.component';
import { RouterModule } from '@angular/router';
import { QrCodePageRoutingModule } from './QrCodePage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [QrCodePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    QrCodePageRoutingModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot()
  ]
})
export class QrCodePageModule { }
