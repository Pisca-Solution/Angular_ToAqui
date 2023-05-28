import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chamada } from 'src/app/shared/interface/chamada/chamada';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

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
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
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
    const horas = dataObj.getUTCHours(); // Obter horas em UTC
    const minutos = dataObj.getUTCMinutes(); // Obter minutos em UTC

    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');

    return `${horasFormatadas}:${minutosFormatados}`;
  }



  criaChamada(){
    if(this.form.valid){
      this.chamada = {
         data: new Date(),
         descricao: this.form.controls['descricao'].value,
         professorId: this.professorId,
         aulasIds: []
      }

      console.log(this.form.value);
      console.log(this.chamada);
    }
  }

  handleTimeSelection(event: any){
    console.log(event)
    const selectedTime = new Date(event.time);
    const hours = String(selectedTime.getHours()).padStart(2, '0');
    const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    console.log('Selected time (formatted):', formattedTime);
  }

  toggle(event){
    console.log(event);
  }
}
