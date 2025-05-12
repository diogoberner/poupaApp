export interface IUser {
  id: string;
  nome: string;
  renda: number;
}

export interface ITransactions {
  id: string;
  nome: string;
  valor: number;
  tipo: "receita" | "despesa" | "";
  categoria: string;
  data: string;
}
