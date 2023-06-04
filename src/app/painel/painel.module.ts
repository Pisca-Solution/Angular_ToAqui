import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelComponent } from './painel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbMenuModule, NbContextMenuModule, NbUserModule, NbActionsModule, NbSelectModule, NbCardModule, NbDialogModule, NbSidebarService } from '@nebular/theme';
import { PainelRoutingModule } from './painel-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

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
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule
  ],
  declarations: [PainelComponent],
  providers: [NbSidebarService]
})
export class PainelModule { }
