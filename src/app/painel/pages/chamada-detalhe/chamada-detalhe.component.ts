import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadaService } from '../home/service/chamada/chamada.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chamada-detalhe',
  templateUrl: './chamada-detalhe.component.html',
  styleUrls: ['./chamada-detalhe.component.scss']
})
export class ChamadaDetalheComponent implements OnInit {

  chamadaId: any;
  alunosPresentes: number = 0;
  alunosFaltantes: number = 0;
  chamadaDados = {};

  displayedColumns: string[] = ['id', 'ra', 'nome', 'presente'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _chamadaService: ChamadaService,
    private alerta: AlertService,
    private spinner: NgxSpinnerService,
    private _activatedRouteService: ActivatedRoute
  ) {
    this._activatedRouteService.params.subscribe(params => params['chamadaId'] ? this.chamadaId = params['chamadaId'] : null);
  }

  ngOnInit() {
    this.getTurmasChamadas();
  }

  getTurmasChamadas(){
    this.spinner.show();

    this._chamadaService.buscaChamadaById(this.chamadaId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            this.chamadaDados = response;

            this.chamadaDados['alunos'].forEach(element => {
              if(element.presente){
                this.alunosPresentes++;
              }else{
                this.alunosFaltantes++;
              }
            });

            let dataObjeto = new Date(this.chamadaDados['data']);
            let dia = String(dataObjeto.getDate()).padStart(2, '0');
            let mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
            let ano = dataObjeto.getFullYear();
            this.chamadaDados['data'] = `${dia}/${mes}/${ano}`;

            this.dataSource = new MatTableDataSource(response.alunos);

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
}
