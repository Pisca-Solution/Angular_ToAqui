import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chamada } from 'src/app/shared/interface/chamada/chamada';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { ChamadaService } from 'src/app/painel/pages/home/service/chamada/chamada.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-cria-chamada',
  templateUrl: './modal-cria-chamada.component.html',
  styleUrls: ['./modal-cria-chamada.component.scss']
})
export class ModalCriaChamadaComponent implements OnInit {

  form: FormGroup;

  chamada: Chamada;
  professorId: number;
  turma: any;
  aulas = []

  constructor(
    private _chamadaService: ChamadaService,
    public bsModalRef: BsModalRef,
    private alerta: AlertService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      timer: [null, []],
      descricao: [null, [Validators.required]],
      presencaTodos: [false, [Validators.required]],
      aulas: this.criaAulas()
    });
  }

  get aulasForm(){
    return this.form.get('aulas') as FormArray;
  }

  criaAulas() {
    let aulasFormArray = new FormArray([]);

    this.turma.aulas.forEach(element => {
      let aulaFormGroup = this.fb.group({
        id: element.id,
        dataInicio: this.formatarHorario(element.dataInicio),
        dataFim: this.formatarHorario(element.dataFim),
        selecionada: false
      });

      aulasFormArray.push(aulaFormGroup);
    });

    return aulasFormArray;
  }

  getAulaSelecionadaControl(index: number): FormControl {
    return this.aulasForm.at(index).get('selecionada') as FormControl;
  }

  formatarHorario(data: string): string {
    const dataObj = new Date(data);
    const horas = dataObj.getUTCHours();
    const minutos = dataObj.getUTCMinutes();

    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');

    return `${horasFormatadas}:${minutosFormatados}`;
  }

  criaChamada(){
    if (this.form.valid) {
      this.chamada = {
        aulasIds: [],
        data: new Date(),
        descricao: this.form.controls['descricao'].value,
        professorId: this.professorId
      };

      this.aulasForm.value.forEach(element => {
        if (element.selecionada) {
          this.chamada.aulasIds.push(element.id);
        }
      });

      this._chamadaService.criarChamada(this.chamada)
          .pipe(take(1))
          .subscribe((response: any) => {
              this.spinner.show();
              if(this.form.controls['presencaTodos'].value){
                this._chamadaService.addPresencaTodos(response.id)
                    .subscribe(arg => {
                      if(arg.success){
                        this.spinner.hide();
                        this.bsModalRef.hide();
                        this.alerta.success("Presença foi adicionada com sucesso!");
                      }else{
                        this.spinner.hide();
                        this.alerta.error(arg.mensagem);
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

              }else{
                this.spinner.hide();
                let dados = {
                  timer: this.form.controls['timer'].value,
                  nomeTurma: this.turma.turma.nomeTurma,
                  chamadaId: response.id
                }

                localStorage.setItem("qrcodeInfo", JSON.stringify(dados));
                this.bsModalRef.hide();

                window.open('painel/qrcode', '_blank');
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
  }

  handleTimeSelection(event: any){
    const selectedTime = new Date(event.time);
    const hours = String(selectedTime.getHours()).padStart(2, '0');
    const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    console.log('Selected time (formatted):', formattedTime);
  }
}
