import { take } from 'rxjs';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';
import { ProfessorService } from '../home/service/professor/professor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChamadaService } from '../home/service/chamada/chamada.service';

@Component({
  selector: 'app-historico-turma',
  templateUrl: './historico-turma.component.html',
  styleUrls: ['./historico-turma.component.scss']
})
export class HistoricoTurmaComponent implements OnInit {

  turmaSelected = 1;
  professorId = null;
  turmas = [];

  date = new Date();
  filter = date => date.getDay() !== 0 && date.getDay() !== 6;

  displayedColumns: string[] = ['id', 'data', 'descricao', 'professor'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _professorService: ProfessorService,
    private _chamadaService: ChamadaService,
    private alerta: AlertService,
    private spinner: NgxSpinnerService
  ) {
    let dadosUsuario = JSON.parse(localStorage.getItem("perfil"));
    this.professorId = dadosUsuario.id;
  }

  async ngOnInit() {
    await this.getTurmasProfessor(this.professorId);
    this.getTurmasChamadas(1);

  }

  async getTurmasProfessor(professorId){
    this.spinner.show();

    await this._professorService.buscaTurmasProfessor(professorId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            this.turmas = response;
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();

          this.alerta.error(error).then(dialog => {
            if(dialog.isConfirmed){
              if(error.status === 403){
                localStorage.clear();
                window.document.location.href = "/login";
              }
            }
          });
        });
  }

  getTurmasChamadas(turmaId: number){
    this.spinner.show();

    this._chamadaService.buscaChamadaByTurma(turmaId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            let dados = response;

            dados.map((dados) => {
              let dataObjeto = new Date(dados.data);
              let dia = String(dataObjeto.getDate()).padStart(2, '0');
              let mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
              let ano = dataObjeto.getFullYear();
              dados.data = `${dia}/${mes}/${ano}`;
            });

            this.dataSource = new MatTableDataSource(dados);

            if(this.dataSource != null) {
              this.initTables()
            }

        }, (error: HttpErrorResponse) => {
          this.spinner.hide();

          this.alerta.error(error).then(dialog => {
            if(dialog.isConfirmed){
              if(error.status === 403){
                localStorage.clear();
                window.document.location.href = "/login";
              }
            }
          });
        });
  }

  private initTables() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => `${pageSize * (page + 1) < length ? pageSize * (page + 1) : length} de ${length}`;

    this.dataSource.paginator = this.paginator;
  }

  turmaChange($event){
    this.turmaSelected = $event;
    this.getTurmasChamadas($event);
  }

  verDetalhes(chamada: any){
    window.document.location.href = "/painel/historico-turma/chamada/" + chamada.id;
  }
}
