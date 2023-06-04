import { Pipe, PipeTransform } from '@angular/core';

/*
 * Redutor de strings
 * Reduz a string de acordo com o número de chars do argumento 1
 * Reduz a string de acordo com o número de chars do argumento 1
 * e coloca a notação no final da mesma de acordo com o argumento 2
 * Uso:
 *   string | stringRedux: 15:"..."
 * Exemplo:
 *   {{ "Reduz a string de acordo com o número de chars do argumento" | stringRedux:15:"..." }}
 *   formata para: "Reduz a string..."
*/
@Pipe({name: 'stringRedux'})
export class StringRedux implements PipeTransform {

    transform(value: string, limit: number, endingNotation: string): string {
        if(value){
            var objItemTexto = value.trim();
            if (objItemTexto.length > limit) {
                objItemTexto = objItemTexto.substring(0, limit).trim();
                for (var i = objItemTexto.length; i > 0; i--) {
                    if (objItemTexto.substring(i, i + 1) === ' ') {
                        objItemTexto = objItemTexto.substring(0, i) + endingNotation;
                        break;
                    }
                }
            }
            return objItemTexto;
        }
    }

}
