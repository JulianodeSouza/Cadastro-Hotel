/** Angular */
import { Component } from '@angular/core';

/** Models */
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {

  /** Variavel de formulário */
  public iForm: {
    dataEntrada: string,
    dataSaida: string,
    adicionalVeiculo: boolean,
    hospedado: boolean,
    pessoa_documento: string
  }

  /** Variavel para preencher tabela */
  public iHospedes: Array<any>;

  constructor() {
    this.inst();
  }

  /** Função para inicializar variáveis */
  private inst() {
    this.iForm = {
      dataEntrada: '',
      dataSaida: '',
      adicionalVeiculo: false,
      hospedado: true,
      pessoa_documento: ''
    }

    this.iHospedes = [];


    this.iHospedes.push(
      {

        nome: 'Juliano',
        documento: '123456',
        telefone: '55992355991',

      },
      {
        nome: 'Jordana',
        documento: '556987',
        telefone: '',
      }



    )
  }

  /** Funcao para buscar hospedes */
  public searchHospedes() {

    console.log(this.iForm);


  }


  /** Função para salvar o checkIn */
  public salvarCheckIn() {


  }
}
