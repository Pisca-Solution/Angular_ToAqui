import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request-service/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

constructor(
  private _requestService: RequestService
) { }

  getDados() {
    const perfil = localStorage.getItem('perfil');
    const class_id = localStorage.getItem('classID');

    if (!perfil)
     return this.buscaDadosUsuario(parseInt(class_id));
    else
      return new Observable<any>(obs => obs.next(JSON.parse(perfil)));
  }

  buscaDadosUsuario(id: number){
    return this._requestService.requestMethod(`professores/${id}`, "GET", true);
  }

  buscaTurmasProfessor(id: number){
    return this._requestService.requestMethod(`professores/${id}/turmas`, "GET", true);
  }
}
