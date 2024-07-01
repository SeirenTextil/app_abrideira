export type ButtonVisibility = {
  [key: string]: boolean | undefined;
};


export interface Main {
  success: boolean;
  data:    Data;
}

export interface Data {
  Situacao:         string;
  Mensagem:         string;
  ItemListaCartoes: ItemListaCartoes;
}



export type ItemListaCartoes = [key: string, {
  CorLinha:             string;
  PrimeiroIcone:        string;
  Cartao:               string;
  Tipo:                 string;
  NomeCliente:          string;
  CodArt:               string;
  CodCor:               string;
  NomeCor:              string;
  Divisao:              string;
  GramaDataColor:       string;
  LarguraSol:           string;
  IconeProcessoFazer:   string;
  LarguraInformada:     string;
  Espera:               string;
  Grupo:                string;
  Rama:                 string;
  SequenciaBanhoAgrupa: string;
  BoxAgrupamento:       string;
  CorAmostra:           string;
  InstrucaoPcp:         string;
  FlagTemParadaMaquina: string;
}]
