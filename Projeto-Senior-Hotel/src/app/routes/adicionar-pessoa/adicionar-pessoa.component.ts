/** Angular */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Models */
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';

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

  constructor() {
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

  }

  public voltar() {
    console.log("Entrou");

    this.iRouter.navigate(['/']);
  }

}
