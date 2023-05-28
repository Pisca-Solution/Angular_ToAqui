import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

    private BASE_API_URL: string = environment.BASE_API_URL;
    private internalRequest: boolean = false;

    constructor(
      private _http: HttpClient,
      private _storageService: StorageService
    ) { }

    requestMethod(requestURL: string, method: string, itsInternal: boolean, data?: any, requestHeader?: any): any {
      this.internalRequest = itsInternal;

      let url = itsInternal ? this.BASE_API_URL + requestURL : requestURL,
          auth = this._storageService.buscarTokenAplicacao(),
          header = requestHeader ? requestHeader : {"Content-Type": "application/json"};

      if (auth && itsInternal){
          header.Authorization = `Bearer ${auth}`;
      }

      let option = { headers: header};
      if(data) {
          return method.toUpperCase() == "CPOST" ? this.throughPost(url, data, option) : this.throughPost(url, JSON.stringify(data), option);
      } else {
          return this.throughGet(url, option);
      }
  };

  private throughPost(url: string, data: any, option?: any) {
    return this._http.post(url, data, option)
        .pipe(
            map(response => {
                return this.internalRequest ? response : this.throwObservableSuccess(response);
            })
        );
   };

   private throughGet(url: string, option?: any) {
       return this._http.get(url, option)
           .pipe(
               map(response => {
                   return this.internalRequest ? response : this.throwObservableSuccess(response);
               })
           );
   };

   private throwObservableSuccess(dataToReturn: any) {
    return {
        success: true,
        message: null,
        data: dataToReturn
    };
};
}
