import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { HistoricoTurmaComponent } from './historico-turma.component';

const routes: Routes = [
  { path: '', component: HistoricoTurmaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoTurmaRoutingModule{ }
