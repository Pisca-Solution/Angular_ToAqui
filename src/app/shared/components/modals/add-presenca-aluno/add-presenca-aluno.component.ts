import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChamadaService } from 'src/app/painel/pages/home/service/chamada/chamada.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';

@Component({
  selector: 'app-add-presenca-aluno',
  templateUrl: './add-presenca-aluno.component.html',
  styleUrls: ['./add-presenca-aluno.component.scss']
})
export class AddPresencaAlunoComponent implements OnInit {

  constructor(
    private _chamadaService: ChamadaService,
    public bsModalRef: BsModalRef,
    private alerta: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

}
