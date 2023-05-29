import { Injectable } from '@angular/core';
import { Chamada } from 'src/app/shared/interface/chamada/chamada';
import { RequestService } from 'src/app/shared/services/request-service/request.service';

@Injectable({
  providedIn: 'root'
})
export class ChamadaService {

  constructor(
    private _requestService: RequestService
  ) { }

  criarChamada(data: Chamada){
    return this._requestService.requestMethod(`chamadas`, "POST", true, data);
  }

  addPresencaTodos(chamadaId: number){
    return this._requestService.requestMethod(`chamadas/${chamadaId}/alunos`, "PUT", true);
  }
}
