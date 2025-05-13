import axios from "axios";
import { ITransactions, IUser } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get<IUser[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

export const createUser = async (
  user: Omit<IUser, "orcamentoDiario">
): Promise<IUser | null> => {
  const userWithDailyBudget = {
    ...user,
    orcamentoDiario: user.renda / 30,
  };
  try {
    const response = await api.post<IUser>("/users", userWithDailyBudget);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return null;
  }
};

export const updateUser = async (
  id: string,
  user: IUser
): Promise<IUser | null> => {
  try {
    const response = await api.patch<IUser>(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};

export const getAllTransactions = async (): Promise<ITransactions[]> => {
  try {
    const response = await api.get<ITransactions[]>("/transactions");
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
    const response = await api.post<ITransactions>(
      "/transactions",
      transaction
    );
    return response.data;
  } catch (error) {
    console.error("Erro a adicionar transação:", error);
    return null;
  }
};
