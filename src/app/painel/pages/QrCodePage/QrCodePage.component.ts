import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrcodeService } from 'src/app/painel/pages/home/service/qrcode/qrcode.service';
import { AlertService } from '../../../shared/services/alert-service/alert-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChamadaService } from '../home/service/chamada/chamada.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddPresencaAlunoComponent } from 'src/app/shared/components/modals/add-presenca-aluno/add-presenca-aluno.component';

@Component({
  selector: 'app-QrCodePage',
  templateUrl: './QrCodePage.component.html',
  styleUrls: ['./QrCodePage.component.scss']
})
export class QrCodePageComponent implements OnInit {

  qrcodeUrl:any;
  informacoes = {};
  chamadaDados: any;
  interval: any;

  displayedColumns: string[] = ['id', 'ra', 'nome', 'presente'];
  dataSource: MatTableDataSource<any>;

  modalRef?: BsModalRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _chamadaService: ChamadaService,
    private _qrCodeService: QrcodeService,
    private alerta: AlertService,
    public sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {
    this.informacoes = JSON.parse(localStorage.getItem("qrcodeInfo"));
  }

  ngOnInit() {
    this.generateQRCode(this.informacoes['chamadaId']);
    this.getTurmasChamadas(this.informacoes['chamadaId']);

    this.interval = setInterval(() =>{
      this.generateQRCode(this.informacoes['chamadaId']);
      this.getTurmasChamadas(this.informacoes['chamadaId']);
    }, 30000);
  }

  getTurmasChamadas(chamadaId: number){
    this._chamadaService.buscaChamadaById(chamadaId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.chamadaDados = response;

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

  generateQRCode(id: number) {
    this._qrCodeService.gerarQrCode(id)
      .pipe(take(1))
      .subscribe((response: any) => {
        this.qrcodeUrl =  'data:image/png;base64,' + response.imageBytes
      }, (error: HttpErrorResponse) => {
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

  abrirModalPresenca(){
    let initialState = {
      alunos: this.chamadaDados['alunos'],
      chamada: this.informacoes['chamadaId']
    }

    this.modalRef =  this.modalService.show(AddPresencaAlunoComponent, { class:"modal-dialog-centered",  initialState });
  }

  encerrarChamada(){
    this.spinner.show();
    clearInterval(this.interval);
    this._chamadaService.enviaEmailConfirmacaoFalta(this.informacoes['chamadaId'])
    .pipe(
      take(1)
    )
    .subscribe((response: any) => {
      this.spinner.hide();
      this.alerta.success(response.mensagem);
    }, (error: HttpErrorResponse) => {

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
}
