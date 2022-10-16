/** Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private iRotaJsonCheckIn: string = 'http://localhost:3001/checkIn';

  constructor(
    private cHttp: HttpClient
  ) { }


  /** Funcao para incluir checkIn */
  // public fazCheckIn(_Dados: any): Observable<any> {
  //   return this.cHttp.post(this.iRotaJsonCheckIn, _Dados).pipe(
  //     map(($retorno) => $retorno),
  //     catchError(($erro))
  //   )
  // }









}
