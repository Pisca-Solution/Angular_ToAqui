import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot(),
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
