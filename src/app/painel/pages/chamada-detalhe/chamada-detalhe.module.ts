import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NbButtonModule, NbCalendarModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChamadaDetalheComponent } from './chamada-detalhe.component';
import { RouterModule } from '@angular/router';
import { ChamadaDetalheRoutingModule } from './chamada-detalhe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChamadaDetalheRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NbCalendarModule,
    NbSelectModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
    NbButtonModule,
    NbCardModule
  ],
  declarations: [ChamadaDetalheComponent]
})
export class ChamadaDetalheModule { }
