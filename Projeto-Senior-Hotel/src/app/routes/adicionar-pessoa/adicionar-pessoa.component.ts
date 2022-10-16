/** Angular */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';

/** Models */
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';
import { PessoasService } from 'src/app/services/requests/pessoas-service/pessoas.service';

@Component({
  selector: 'app-adicionar-pessoa',
  templateUrl: './adicionar-pessoa.component.html',
  styleUrls: ['./adicionar-pessoa.component.scss']
})
export class AdicionarPessoaComponent {
  /** Variavel de navegação */
  public iRouter: Router;

  /** Variavel de formulário */
  public iForm: ObjPessoa;

  constructor(
    private cRequest: PessoasService
  ) {
    this.inst();
  }

  /** Funcao para inicalizar as variaveis */
  private inst() {

    this.iForm = {
      nome: '',
      documento: '',
      telefone: '',
    }
  }

  /** Funcao para salvar hospede */
  public salvarHospede() {
    this.cRequest.pessoasService('POST', false, this.iForm)
      .subscribe(($retorno: any) => {
        if ($retorno) {
          alert("Hóspede incluído com sucesso!");

          this.inst();
        }
      })

  }

  public voltar() {
    this.iRouter.navigate(['/']);
  }
}
