import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelComponent } from './painel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbMenuModule, NbContextMenuModule, NbUserModule, NbActionsModule, NbSelectModule, NbCardModule, NbDialogModule, NbSidebarService } from '@nebular/theme';
import { PainelRoutingModule } from './painel-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PainelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSelectModule,
    NbLayoutModule,
    NbCardModule,
    SharedModule,
    NbDialogModule.forChild(),
  ],
  declarations: [PainelComponent],
  providers: [NbSidebarService]
})
export class PainelModule { }
