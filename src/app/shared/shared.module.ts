import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbTimepickerModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert-service/alert-service.service';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { InfoTurmasComponent } from './components/info-turmas/info-turmas.component';
import { ModalCriaChamadaComponent } from './components/modals/modal-cria-chamada/modal-cria-chamada.component';
import { RequestService } from './services/request-service/request.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StringRedux } from './pipes/string-redux.pipe';
import { AddPresencaAlunoComponent } from './components/modals/add-presenca-aluno/add-presenca-aluno.component';

@NgModule({
  declarations: [InfoTurmasComponent, ModalCriaChamadaComponent, StringRedux, AddPresencaAlunoComponent],
  exports: [InfoTurmasComponent, ModalCriaChamadaComponent, StringRedux, AddPresencaAlunoComponent],
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
    HttpClientModule,
    NgxSpinnerModule.forRoot()
  ],
  providers: [
    AlertService,
    RequestService
  ]
})
export class SharedModule { }
