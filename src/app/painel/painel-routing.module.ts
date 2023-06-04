import { QrCodePageModule } from './pages/QrCodePage/QrCodePage.module';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { QrCodePageComponent } from './pages/QrCodePage/QrCodePage.component';
import { HistoricoTurmaComponent } from './pages/historico-turma/historico-turma.component';
import { ChamadaDetalheComponent } from './pages/chamada-detalhe/chamada-detalhe.component';

const routes: Routes = [
  { path: '', component: PainelComponent,
    children: [
      {
        path: 'chamada-qrcode', component: HomeComponent,
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'qrcode', component: QrCodePageComponent,
        loadChildren: () =>
          import('./pages/QrCodePage/QrCodePage.module').then((m) => m.QrCodePageModule)
      },
      {
        path: 'historico-turma', component: HistoricoTurmaComponent,
        loadChildren: () =>
          import('./pages/historico-turma/historico-turma.module').then((m) => m.HistoricoTurmaModule)
      },
      {
        path: 'historico-turma/chamada/:chamadaId', component: ChamadaDetalheComponent,
        loadChildren: () =>
          import('./pages/chamada-detalhe/chamada-detalhe.module').then((m) => m.ChamadaDetalheModule)
      }
    ]
  },
  { path: '**', redirectTo: 'chamada-qrcode' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule{ }
