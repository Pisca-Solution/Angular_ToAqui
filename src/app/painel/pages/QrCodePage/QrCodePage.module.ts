import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodePageComponent } from './QrCodePage.component';
import { RouterModule } from '@angular/router';
import { QrCodePageRoutingModule } from './QrCodePage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [QrCodePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    QrCodePageRoutingModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
  ]
})
export class QrCodePageModule { }
