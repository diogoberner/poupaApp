export interface IUser {
  id: number;
  nome: string;
  renda: number;
}

export interface ITransactions {
  id: number;
  nome: string;
  valor: number;
  tipo: "receita" | "despesa";
  categoria: string;
  data: string;
}
