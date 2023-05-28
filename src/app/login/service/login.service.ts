import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request-service/request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _requestService: RequestService,
    private router: Router
  ) { }

  login(login: object) {
    return this._requestService.requestMethod(`api/auth`, "POST", true, login);
  }

  check(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout() {
    localStorage.clear();
    window.document.location.href = "/login";
  }
}
