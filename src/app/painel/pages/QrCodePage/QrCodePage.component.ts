import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrcodeService } from 'src/app/painel/pages/home/service/qrcode/qrcode.service';
import { AlertService } from '../../../shared/services/alert-service/alert-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-QrCodePage',
  templateUrl: './QrCodePage.component.html',
  styleUrls: ['./QrCodePage.component.scss']
})
export class QrCodePageComponent implements OnInit {

  qrcodeUrl:any;
  informacoes = {};

  constructor(
    private _qrCodeService: QrcodeService,
    private alerta: AlertService,
    public sanitizer: DomSanitizer
  ) {
    this.informacoes = JSON.parse(localStorage.getItem("qrcodeInfo"));
  }

  ngOnInit() {
    this.generateQRCode(this.informacoes['chamadaId']);

    setInterval(() =>{
      this.generateQRCode(this.informacoes['chamadaId']);
    }, 30000);
  }

  generateQRCode(id: number) {
    this._qrCodeService.gerarQrCode(id)
      .pipe(take(1))
      .subscribe((response: any) => {
        console.log(response.imageBytes);

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
}
