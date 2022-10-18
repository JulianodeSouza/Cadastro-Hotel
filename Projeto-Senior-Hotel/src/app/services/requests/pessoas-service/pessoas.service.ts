/** Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';


@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  /** Variavel de rota do JSON */
  private iRotaJsonPessoas: string = 'http://localhost:3001/pessoas';

  constructor(
    private cHttp: HttpClient
  ) { }

  /** Funcao para incluir e buscar Pessoas */
  pessoasService(_Method: string, _Dados?: any): Observable<ObjPessoa> {
    if (_Method == 'GET') {
      return this.cHttp.get<ObjPessoa>(this.iRotaJsonPessoas).pipe(
        map($retorno => $retorno),
        catchError(($error) => this.catchError($error, "Erro na requisição"))
      );

    } else if (_Method == 'POST') {
      return this.cHttp.post<ObjPessoa>(this.iRotaJsonPessoas, _Dados).pipe(
        map($retorno => $retorno),
        catchError(($error) => this.catchError($error, "Erro na requisição"))
      );
    }

    return EMPTY;
  }

  /** Funcao para exibicao de erros na requisicao */
  private catchError(_Error: any, _Mensagem: string): Observable<any> {
    console.log(_Error);
    alert(_Mensagem);

    return EMPTY;
  }
}