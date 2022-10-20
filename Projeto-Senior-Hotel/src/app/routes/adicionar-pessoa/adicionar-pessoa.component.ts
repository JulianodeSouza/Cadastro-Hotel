/** Angular */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Models */
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';
import { AlertsServiceService } from 'src/app/services/alerts/alerts-service.service';
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
  public iErro: {
    nome: boolean,
    documento: boolean,
    telefone: boolean,
  };

  /** Variavel de interação */
  public iFormChange: boolean;

  constructor(
    private cRequest: PessoasService,
    private cAlertService: AlertsServiceService
  ) {
    this.inst();
  };

  /** Funcao para inicalizar as variaveis */
  private inst() {

    this.iForm = {
      nome: '',
      documento: '',
      telefone: '',
    };

    this.iErro = {
      nome: false,
      documento: false,
      telefone: false,
    };

    this.iFormChange = false;
  };

  /** Funcao para validar se os campos estão preenchidos */
  public validate(_Campo: string) {
    switch (_Campo) {
      case 'nome':
        if (this.iForm.nome == '') {
          this.iErro.nome = true;
        } else {
          this.iErro.nome = false;
        }
        break;
      case 'documento':
        if (this.iForm.documento == '') {
          this.iErro.documento = true;
        } else {
          this.iErro.documento = false;
        }
        break
      case 'telefone':
        if (this.iForm.telefone == '') {
          this.iErro.telefone = true;
        } else {
          this.iErro.telefone = false;
        }
        break
    }

    this.iFormChange = true;
  };

  /** Funcao para limpar as validações ao salvar */
  public validateForm() {
    if (this.iForm.nome == '') {
      this.iErro.nome = true;
    } else {
      this.iErro.nome = false;
    }

    if (this.iForm.documento == '') {
      this.iErro.documento = true;
    } else {
      this.iErro.documento = false;
    }

    if (this.iForm.telefone == '') {
      this.iErro.telefone = true;
    } else {
      this.iErro.telefone = false;
    }
  }

  /** Funcao para salvar hospede */
  public saveHospede() {
    this.validateForm()

    /** Remove caracteres especiais do documento */
    let documento1 = this.iForm.documento.replace('.', '');
    let documento2 = documento1.replace('.', '');
    let documento3 = documento2.replace('-', '');
        
    let vDados: any = {
      nome: this.iForm.nome,
      documento: documento3,
      telefone: this.iForm.telefone
    }

    if (!this.iErro.nome && !this.iErro.documento && !this.iErro.telefone) {
      this.cRequest.pessoasService('POST', vDados)
        .subscribe(($retorno: any) => {
          if ($retorno) {
            this.cAlertService.pop('success', "Hóspede incluído com sucesso!", 5000);
            this.inst();
          }
        });
    } else {
      this.cAlertService.pop('warning', "Preencha todos campos obrigatórios!", 5000);
    }
  };

  /** Funcao para voltar a tela de check-in */
  public voltar() {
    this.iRouter.navigate(['/']);
  };
}
