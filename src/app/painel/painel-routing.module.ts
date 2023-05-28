import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: PainelComponent,
    children: [
      {
        path: 'chamada-qrcode', component: HomeComponent,
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule)
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
