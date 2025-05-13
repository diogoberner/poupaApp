export interface IUser {
  id: string;
  nome: string;
  renda: number;
  orcamentoDiario: number;
}

export interface ITransactions {
  id: string;
  userId: string;
  nome: string;
  valor: number;
  tipo: "receita" | "despesa" | "";
  categoria: string;
  data: string;
}
