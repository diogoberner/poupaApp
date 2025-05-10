import axios from "axios";
import { ITransactions, IUser } from "../types";

const api = axios.create({
  baseURL: "https://localhost:5000",
});

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get<IUser[]>("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

export const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const response = await api.post<IUser>("/usuarios", user);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return null;
  }
};

export const getAllTransactions = async (): Promise<ITransactions[]> => {
  try {
    const response = await api.get<ITransactions[]>("/transacoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};

export const createTransaction = async (
  transaction: ITransactions
): Promise<ITransactions | null> => {
  try {
    const response = await api.post<ITransactions>("/transacoes", transaction);
    return response.data;
  } catch (error) {
    console.error("Erro a adicionar transação:", error);
    return null;
  }
};
