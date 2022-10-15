/** Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

/** Models */
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

  /** Funcao para incluir, buscar Pessoas */
  pessoasService(_Method: string, _Hospede: boolean, _Dados?: any): Observable<any> {
    return this.cHttp.post(this.iRotaJsonPessoas, _Dados).pipe(
      map(($retorno) => $retorno),
      catchError(async ($error) => this.catchError($error, "Erro na requisição"))
    );
  }

  public catchError(_Error: any, _Mensagem: string) {
    console.log(_Error);
    alert(_Mensagem);

    return null
  }
}


