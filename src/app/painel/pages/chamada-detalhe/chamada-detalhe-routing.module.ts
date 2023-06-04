import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ChamadaDetalheComponent } from './chamada-detalhe.component';

const routes: Routes = [
  { path: '', component: ChamadaDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadaDetalheRoutingModule{ }
