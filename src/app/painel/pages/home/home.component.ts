import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QrcodeService } from './service/qrcode/qrcode.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ProfessorService } from './service/professor/professor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  qrcodeUrl: string = "";
  professorId = null;
  turmas = [];

  constructor(
    private _professorService: ProfessorService,
    private _qrCodeService: QrcodeService,
    private alerta: AlertService,
    private spinner: NgxSpinnerService
  ) {
    let dadosUsuario = JSON.parse(localStorage.getItem("perfil"));
    this.professorId = dadosUsuario.id;
  }


  ngOnInit() {
    this.getTurmasProfessor(this.professorId)
  }

  getTurmasProfessor(professorId){
    this.spinner.show();

    this._professorService.buscaTurmasProfessor(professorId)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            this.turmas = response;
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.alerta.error(error);
        });
  }

  generateQRCode(id: number) {
    this.spinner.show();

    this._qrCodeService.gerarQrCode(id)
        .pipe(
          take(1)
        )
        .subscribe((response: any) => {
            this.spinner.hide();
            const reader = new FileReader();
            reader.onloadend = () => {
              this.qrcodeUrl = reader.result as string;
            };
            reader.readAsDataURL(response);

        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.alerta.error(error);
        });
  }
}
