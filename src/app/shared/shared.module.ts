import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbTimepickerModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert-service/alert-service.service';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { InfoTurmasComponent } from './components/info-turmas/info-turmas.component';
import { ModalCriaChamadaComponent } from './components/modals/modal-cria-chamada/modal-cria-chamada.component';

@NgModule({
  declarations: [InfoTurmasComponent, ModalCriaChamadaComponent],
  exports: [InfoTurmasComponent, ModalCriaChamadaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbCardModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDateFnsDateModule,
    NbCheckboxModule,
    NgxMaskModule.forRoot({
      validation: false
    }),
    NbToggleModule,
  ],
  providers: [
    AlertService
  ]
})
export class SharedModule { }
