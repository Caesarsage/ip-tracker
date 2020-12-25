import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { IAddress } from '../model/header.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient ) { }

  getAddress(query: string ):Observable<IAddress>{
    return this.http.get<IAddress>(`${environment.BaseUrl}apiKey=${environment.IPKEYS}&ipAddress=${query}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUserLocation():Promise<any>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        resolve({
          lat: resp.coords.latitude,
          lon: resp.coords.longitude
        })
        reject('Sorry current location not found')
      })
    })
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
