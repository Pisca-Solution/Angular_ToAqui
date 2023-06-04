import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoTurmaComponent } from './historico-turma.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NbCalendarModule, NbSelectModule } from '@nebular/theme';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HistoricoTurmaRoutingModule } from './historico-turma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HistoricoTurmaRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NbCalendarModule,
    NbSelectModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [HistoricoTurmaComponent]
})
export class HistoricoTurmaModule { }
