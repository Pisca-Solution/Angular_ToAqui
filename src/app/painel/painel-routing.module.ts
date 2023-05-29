import { QrCodePageModule } from './pages/QrCodePage/QrCodePage.module';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { QrCodePageComponent } from './pages/QrCodePage/QrCodePage.component';

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
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule{ }
