/** Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private iRotaJsonCheckIn: string = 'http://localhost:3001/checkIn';

  constructor(
    private cHttp: HttpClient,
  ) { }

  /** Funcao para buscar, incluir e alterar os dados */
  public checkInService(_Method: string, _Dados: any, _Hospedado?: boolean): Observable<any> {

    if (_Method == 'GET') {
      const url = `${this.iRotaJsonCheckIn}?hospedado=${_Hospedado}`

      return this.cHttp.get(url).pipe(
        map(($retorno) => $retorno),
        catchError(($error) => this.catchError($error, 'Erro na requisição.'))
      );
    } else if (_Method == 'POST') {
      return this.cHttp.post(this.iRotaJsonCheckIn, _Dados).pipe(
        map(($retorno) => $retorno),
        catchError(($error) => this.catchError($error, 'Erro na requisição.'))
      );
    } else if (_Method == 'PUT') {
      const url = `${this.iRotaJsonCheckIn}/${_Dados.id}`;

      return this.cHttp.put(url, _Dados).pipe(
        map(($retorno) => $retorno),
        catchError(($error) => this.catchError($error, 'Erro na requisição.'))
      );
    }

    return EMPTY;
  };
    
  /** Funcao para exibicao de erros */
  private catchError(_Error: any, _Mensagem: string) {
    console.log(_Error);
    alert(_Mensagem);

    return EMPTY;
  };
}
