/** Angular */
import { Component } from '@angular/core';

/** Services */
import { CheckInService } from 'src/app/services/requests/checkIn-service/check-in.service';
import { PessoasService } from 'src/app/services/requests/pessoas-service/pessoas.service';

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
    pessoa: ObjPessoa,
    valorGasto: number
    hospedado: boolean,
  }

  /** Variavel dos filtros */
  public iFiltros: boolean;

  /** Variavel para preencher tabela */
  public iHospedes: Array<any>;

  /** Variavel para preencher o select */
  public iPessoas: Array<any>;

  constructor(
    private cRequestCheckIn: CheckInService,
    private cRequestPessoas: PessoasService,
  ) {
    this.inst();
    this.buscaCadastros();
    this.searchHospedes();
  }

  /** Função para inicializar variáveis */
  private inst() {
    this.iForm = {
      dataEntrada: '',
      dataSaida: '',
      adicionalVeiculo: false,
      hospedado: false,
      pessoa: {
        nome: '',
        documento: '',
        telefone: '',
      },
      valorGasto: 0
    }

    this.iFiltros = true;

    this.iHospedes = [];
  }

  /** Funcao para buscar pessoas cadastradas para exibir no select */
  public buscaCadastros() {
    this.cRequestPessoas.pessoasService('GET')
      .subscribe(($return: any) => {
        if ($return) {
          this.iPessoas = $return;
        } else {
          alert('Nenhum cadastro encontrado.');
        }
      });
  };

  /** Funcao para calcular hospedagem */
  public calcHospedagem(_Hospede: any) {
    let vSumTotal: number = 0;
    let vSumDiasHospedagem: number = 0;
    let vSumAdicionalVeiculo: number = 0;
    let validaTaxaExtra: string = '';
    let data_entrada = new Date(_Hospede.dataEntrada);
    let data_saida = new Date(_Hospede.dataSaida);

    if (_Hospede.dataEntrada != '' && _Hospede.dataSaida != '') {
      // If para validar se a hospedagem está em dia de semana
      if (data_entrada.getDay() >= 1 && data_saida.getDay() <= 5) {
        for (let index = data_entrada.getDate(); index < data_saida.getDate(); index++) {
          vSumDiasHospedagem++

          if (_Hospede.adicionalVeiculo) {
            vSumAdicionalVeiculo++
          }
        };

        validaTaxaExtra = data_saida.getHours() + ':' + data_saida.getMinutes();

        if (validaTaxaExtra > '16:30') {
          vSumDiasHospedagem++
        }

        if (_Hospede.adicionalVeiculo) {
          vSumTotal = vSumDiasHospedagem * 120 + vSumAdicionalVeiculo * 15;
        } else {
          vSumTotal = vSumDiasHospedagem * 120;
        }
      } else {
        for (let index = data_entrada.getDate(); index < data_saida.getDate(); index++) {
          vSumDiasHospedagem++

          if (_Hospede.adicionalVeiculo) {
            vSumAdicionalVeiculo++
          }
        };

        validaTaxaExtra = data_saida.getHours() + ':' + data_saida.getMinutes();

        if (validaTaxaExtra > '16:30') {
          vSumDiasHospedagem++
        }

        if (_Hospede.adicionalVeiculo) {
          vSumTotal = vSumDiasHospedagem * 150 + vSumAdicionalVeiculo * 20;
        } else {
          vSumTotal = vSumDiasHospedagem * 150;
        }
      }
    } else {
      alert('É preciso informar uma Data de Entrada e uma Data de Saída.');
    }

    return vSumTotal;
  };

  /** Função para salvar o checkIn */
  public saveCheckIn() {
    if (this.iForm.dataSaida != '' && this.iForm.valorGasto == 0) {
      for (let wHospede of this.iHospedes) {
        if (this.iForm.pessoa.nome == wHospede.pessoa.nome) {
          wHospede.dataSaida = this.iForm.dataSaida;
          wHospede.hospedado = false;
          let vTotalGasto = this.calcHospedagem(wHospede);

          wHospede = {
            id: wHospede.id,
            dataSaida: wHospede.dataSaida,
            dataEntrada: wHospede.dataEntrada,
            hospedado: wHospede.hospedado,
            valorGasto: vTotalGasto,
            adicionalVeiculo: wHospede.adicionalVeiculo,
            pessoa: wHospede.pessoa
          }

          this.cRequestCheckIn.checkInService('PUT', wHospede)
            .subscribe(($retorno: any) => {
              alert('Check-out realizado com sucesso!');
              this.clearCampos();
              this.searchHospedes();
            });
        }
      };
    } else {
      if (this.iForm.pessoa.nome != '') {
        for (let wPessoa of this.iPessoas) {
          if (this.iForm.pessoa.nome == wPessoa.nome) {
            this.iForm.pessoa.documento = wPessoa.documento;
            this.iForm.pessoa.telefone = wPessoa.telefone;
          }
        };
        this.iForm.hospedado = true;

        this.cRequestCheckIn.checkInService('POST', this.iForm)
          .subscribe(($return: any) => {
            if ($return) {
              alert('Check-in realizado com sucesso!');
              this.clearCampos();
              this.searchHospedes();
            } else {
              alert("Erro ao salvar check-in.");
            }
          });
      } else {
        alert('É preciso informar o cadastro de uma pessoa para poder continuar');
      }
    }
  };

  /** Funcao para todos buscar hospedes */
  public searchHospedes(_Hospedado?: boolean) {
    this.iHospedes = [];

    this.cRequestCheckIn.checkInService('GET', null, _Hospedado)
      .subscribe(($retorno: any) => {
        if ($retorno.length > 0) {
          this.iHospedes = $retorno;
        }
      });
  };

  /** Funcao para limpar os campos */
  public clearCampos() {
    this.iForm = {
      dataEntrada: '',
      dataSaida: '',
      adicionalVeiculo: false,
      hospedado: false,
      pessoa: {
        nome: '',
        documento: '',
        telefone: '',
      },
      valorGasto: 0
    }
  };
}
