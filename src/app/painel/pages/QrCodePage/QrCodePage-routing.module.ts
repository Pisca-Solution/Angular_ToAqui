import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { QrCodeComponent } from 'ng-qrcode';

const routes: Routes = [
  { path: '', component: QrCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrCodePageRoutingModule{ }
