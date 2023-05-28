import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request-service/request.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(
  private _requestService: RequestService
  ) { }

  gerarQrCode(id: number){
    return this._requestService.requestMethod(`qrcode/${id}`, "GET", true);
  }
}
