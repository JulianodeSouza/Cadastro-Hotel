export interface CheckIn {
  pessoa: {
    nome: string,
    documento: string,
    telefone: string,
  },
  dataEntrada: string,
  dataSaida: string,
  adicionalVeiculo: boolean
} 