/** Angular */
import { Component } from '@angular/core';

/** Services */
import { CheckInService } from 'src/app/services/requests/checkIn-service/check-in.service';
import { PessoasService } from 'src/app/services/requests/pessoas-service/pessoas.service';

/** Models */
import { ObjPessoa } from 'src/app/models/pessoa/pessoa.models';

/** Service */
import { AlertsServiceService } from 'src/app/services/alerts/alerts-service.service';

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

  /** Variavel para realizar a pesquisa de cadastros */
  public iPesquisa: string;

  /** Variavel de interação */
  public iFormChange: boolean;

  /** Variavel dos filtros */
  public iFiltros: boolean;

  /** Variavel para preencher tabela */
  public iHospedes: Array<any>;

  /** Variaveis de preenchimento */
  public iPessoas: Array<any>;
  public iPessoaBuscada: Array<any>;

  constructor(
    private cRequestCheckIn: CheckInService,
    private cRequestPessoas: PessoasService,
    private cAlertsService: AlertsServiceService
  ) {
    this.inst();
    this.searchHospedes(true);
    this.searchCadastros();
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
    };

    this.iPesquisa = '';

    this.iFormChange = false;

    this.iFiltros = true;

    this.iHospedes = [];

    this.iPessoas = [];
    this.iPessoaBuscada = [];
  };

  /** Funcao para buscar todas as pessoas cadastradas */
  public searchCadastros() {
    this.cRequestPessoas.pessoasService('GET', this.iPesquisa)
      .subscribe(($return: any) => {
        if ($return.length > 0) {
          this.iPessoas = $return;
        } else {
          this.cAlertsService.pop('warning', 'Nenhum cadastro encontrado.', 3000);
        }
      });
  };

  /** Funcao para realizar a busca da pessoa informada no campo de pesquisa */
  public buscaPessoa(_Pessoa: string) {
    this.iPessoaBuscada = [];

    for (let wCadPessoas of this.iPessoas) {
      if (wCadPessoas.nome == _Pessoa || wCadPessoas.documento == _Pessoa) {
        this.iPessoaBuscada.push(wCadPessoas);
        this.iForm.pessoa = {
          nome: wCadPessoas.nome,
          documento: wCadPessoas.documento,
          telefone: wCadPessoas.telefone
        };

        break;
      }
    };

    if (this.iPessoaBuscada.length == 0) {
      this.cAlertsService.pop('warning', 'Pesquise pelo nome completo ou remova os caracteres especiais do documento.', 5000);
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

  /** Funcao para calcular hospedagem */
  public calcHospedagem(_Hospede: any) {
    let vSumTotal: number = 0;
    let vSumDiasHospedagem: number = 0;
    let vSumAdicionalVeiculo: number = 0;
    let validaTaxaExtra: string = '';
    let data_entrada = new Date(_Hospede.dataEntrada || this.iForm.dataEntrada);
    let data_saida = new Date(_Hospede.dataSaida || this.iForm.dataSaida);

    if (_Hospede.dataEntrada != '' && _Hospede.dataSaida != '') {
      if (data_saida.getDate() > data_entrada.getDate()) {
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
        this.cAlertsService.pop('warning', 'Data de Saída não pode ser menor que a data de entrada', 3000);
      }
    } else {
      this.cAlertsService.pop('warning', 'É preciso informar uma Data de Entrada e uma Data de Saída.', 3000);
    }

    return vSumTotal;
  };

  /** Função para salvar o checkIn */
  public saveCheckIn() {
    if (this.iForm.dataSaida != '' && this.iHospedes.length == 0) {
      this.cAlertsService.pop('warning', 'Hóspede não fez check-in. Para realizar o check-in é preciso informar somente a data de entrada.', 10000);
    } else {
      if (this.iForm.dataSaida != '' && this.iForm.valorGasto == 0) {
        if (this.iForm.pessoa.nome != '') {
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

              // this.cRequestCheckIn.checkInService('PUT', wHospede)
              //   .subscribe(($retorno: any) => {
              //     this.cAlertsService.pop('success', 'Check-out realizado com sucesso!', 5000);
              //     this.clearCampos();
              //     this.searchHospedes(this.iFiltros);
              //   });
            }
          }
        } else {
          this.cAlertsService.pop('warning', 'É preciso informar o cadastro de uma pessoa para poder continuar.', 3000);
        }
      } else {
        if (this.iForm.pessoa.nome != '') {
          if (this.iForm.dataEntrada != '') {
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
                  this.cAlertsService.pop('success', 'Check-in realizado com sucesso!', 5000);
                  this.clearCampos();
                  this.searchHospedes(this.iFiltros); // passando a opção que está selecionada nos filtros
                } else {
                  this.cAlertsService.pop("error", "Erro ao salvar check-in.", 5000);
                }
              });
          } else {
            this.cAlertsService.pop('warning', 'É preciso informar uma Data/Hora de entrada para poder continuar.', 3000);
          }

        } else {
          this.cAlertsService.pop('warning', 'É preciso informar o cadastro de uma pessoa para poder continuar.', 3000);
        }
      }
    }
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
    };

    this.iPesquisa = '';

    this.iPessoaBuscada = [];
  };
}
