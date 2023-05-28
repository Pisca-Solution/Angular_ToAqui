import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const appTokenKey:string = "token";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private storageSub = new Subject<string>()

    constructor() { }

    setObject(item: string, objectItem: any){
        localStorage.setItem(item, JSON.stringify(objectItem));
    }

    getObject(item: string): any{
        let itemObjeto: any = localStorage.getItem(item);
        if(itemObjeto)
            itemObjeto = JSON.parse(itemObjeto);

        return itemObjeto || [];
    }

    inserirTokenAplicacao(token: string): void {
        localStorage.setItem(appTokenKey, token);
        //Change subject from localStorage change
        this.storageSub.next('added');
    };

    limparTokenAplicacao(): void {
        if(this.verificarTokenAplicacao()){
            localStorage.removeItem(appTokenKey);
        }
    };

    buscarTokenAplicacao() {
        return localStorage.getItem(appTokenKey);
    };

    //Verify if the token is on local storage and return it
    verificarTokenAplicacao(): boolean {
        if (localStorage.getItem(appTokenKey) != null) {
            return true
        } else {
            return false
        }
    }
}
