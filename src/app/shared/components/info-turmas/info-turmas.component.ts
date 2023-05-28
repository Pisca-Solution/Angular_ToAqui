import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlertService } from '../../services/alert-service/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChamadaService } from 'src/app/painel/pages/home/service/chamada/chamada.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalCriaChamadaComponent } from '../modals/modal-cria-chamada/modal-cria-chamada.component';

@Component({
  selector: 'app-info-turmas',
  templateUrl: './info-turmas.component.html',
  styleUrls: ['./info-turmas.component.scss'],
})
export class InfoTurmasComponent implements OnInit, OnChanges {
  @Input('dados') dados: any;

  modalRef?: BsModalRef;
  professorId: number;

  constructor(
    private chamadaService: ChamadaService,
    private alerta: AlertService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {
    let dadosUsuario = JSON.parse(localStorage.getItem("perfil"));
    this.professorId = dadosUsuario.id;
  }

  ngOnChanges() {
    this.ordenarTurmasPorDiaSemana();
  }

  ngOnInit() {

  }

  getDiaSemana(dataInicio: string): string {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const data = new Date(dataInicio);
    const diaSemana = data.getDay();

    return diasSemana[diaSemana];
  }

  ordenarTurmasPorDiaSemana() {
    this.dados.sort((a, b) => {
      const diaSemanaA = this.getDiaSemana(a.aulas[0].dataInicio);
      const diaSemanaB = this.getDiaSemana(b.aulas[0].dataInicio);

      return this.obterIndiceDiaSemana(diaSemanaA) - this.obterIndiceDiaSemana(diaSemanaB);
    });
  }

  obterIndiceDiaSemana(diaSemana: string): number {
    const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    return diasSemana.indexOf(diaSemana);
  }

  modalCriaChamada(turma: object) {
    let initialState = {
      professorId: this.professorId,
      turma: turma
    }

    this.modalRef =  this.modalService.show(ModalCriaChamadaComponent, { class:"modal-lg modal-dialog-centered",  initialState });
  }
}
