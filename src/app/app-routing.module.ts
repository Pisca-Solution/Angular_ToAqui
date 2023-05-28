import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PainelComponent } from './painel/painel.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'painel',
    loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
