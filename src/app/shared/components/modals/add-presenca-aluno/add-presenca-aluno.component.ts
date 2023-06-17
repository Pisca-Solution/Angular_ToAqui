import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ChamadaService } from 'src/app/painel/pages/home/service/chamada/chamada.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';

@Component({
  selector: 'app-add-presenca-aluno',
  templateUrl: './add-presenca-aluno.component.html',
  styleUrls: ['./add-presenca-aluno.component.scss']
})
export class AddPresencaAlunoComponent implements OnInit {

  chamada: number;
  alunos: any = [];

  alunoSelecionado;

  constructor(
    private _chamadaService: ChamadaService,
    public bsModalRef: BsModalRef,
    private alerta: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.alunos = this.alunos.filter(alunos => {
      return alunos.presente != true;
    });
  }

  addPresenca(alunoId){
    this.spinner.show();
    this._chamadaService.addPresencaAluno(this.chamada, alunoId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
          if(response.success){
              this.spinner.hide();

              this.bsModalRef.hide();

              this.alerta.success(response.mensagem);
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

  alunoChange($event){
    this.alunoSelecionado = $event;
  }

  addcionarPresenca(){
    this.addPresenca(this.alunoSelecionado);
  }
}
