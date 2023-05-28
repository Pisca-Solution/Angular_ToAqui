import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(mensagem: string, toast: boolean = false, tempo: number = 3000) {
    return Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: mensagem,
      timer: tempo,
      showCancelButton: false,
      showConfirmButton: true,
      toast: toast
    });
  }

  error(mensagem: HttpErrorResponse | string, status: number = 400) {
    let mensagemErro: string = '';

    if (status === 500 || (mensagem instanceof HttpErrorResponse && mensagem.status === 500)) {
      mensagemErro = 'Desculpe, não foi possível executar essa ação. Por favor, tente novamente mais tarde!';
      console.log({ erro: mensagem, data: Date().toString() });
    }

    const codStatus = mensagem instanceof HttpErrorResponse ? mensagem.status : status;

    switch (codStatus) {
      case 400:
      case 422:
        if (mensagem instanceof HttpErrorResponse) {
          if (mensagem.error.errors !== undefined) {
            Object.keys(mensagem.error.errors).forEach(campoErro => {
              mensagemErro += mensagem.error.errors[campoErro].join(' ') + '<br><br>';
            });
          } else
            mensagemErro = mensagem.error.detail;
        } else
          mensagemErro = mensagem;
        break;
      case 401:
        if (localStorage.getItem('token'))
          mensagemErro = 'Você não está autorizado a realizar essa ação. Faça o login novamente';
        else
          mensagemErro = 'Você precisa fazer o login na plataforma.';
        break;
      case 403:
        mensagemErro = 'Você não tem permissão para executar essa ação.';
        break;
      case 404:
        mensagemErro = 'Dado não encontrado.';
        break;
      case 405:
        mensagemErro = 'Ação indisponível no momento. Tente novamente mais tarde.';
        break;
      default:
        mensagemErro = 'Desculpe, não foi possível executar essa ação. Por favor, tente novamente mais tarde!';
        console.log({ status: codStatus, erro: mensagem, data: Date().toString() });
        break;
    }

    return Swal.fire({
      icon: 'error',
      title: 'Erro!',
      html: mensagemErro,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Ok'
    });
  }

  warning(mensagem: string, textNegativo: string = 'Não', textPositivo: string = 'Sim', toast: boolean = false) {
    return Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: mensagem,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: textNegativo,
      confirmButtonText: textPositivo,
      toast: toast
    });
  }

  info(mensagem: string, toast: boolean = false) {
    return Swal.fire({
      icon: 'info',
      title: 'Atenção!',
      text: mensagem,
      showCancelButton: false,
      showConfirmButton: true,
      toast: toast
    });
  }

  question(titulo: string, mensagem: string, corIcone: string = '#87adbc', textNegativo: string = 'Não', textPositivo: string = 'Sim') {
    return Swal.fire({
      icon: 'question',
      title: titulo,
      text: mensagem,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: textNegativo,
      confirmButtonText: textPositivo,
      iconColor: corIcone
    });
  }
}
