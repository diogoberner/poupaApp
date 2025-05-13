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
  user: Partial<IUser>
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
  transaction: ITransactions,
  user: Omit<IUser, "nome">
): Promise<{
  newTransaction: ITransactions;
  newDailyBudget: number;
} | null> => {
  const transactionWithUserId = {
    ...transaction,
    userId: user.id,
  };
  try {
    const response = await api.post<ITransactions>(
      "/transactions",
      transactionWithUserId
    );

    const transactions = await getAllTransactions();
    const balance = calculateBalance(transactions);

    const newDailyBudget = user.renda / 30 + balance;
    await updateUser(user.id, {
      orcamentoDiario: newDailyBudget,
    });

    return {
      newTransaction: response.data,
      newDailyBudget,
    };
  } catch (error) {
    console.error("Erro a adicionar transação:", error);
    return null;
  }
};

const calculateBalance = (transactions: ITransactions[]) => {
  const total = transactions.reduce((total, transaction) => {
    return transaction.tipo === "receita"
      ? total + transaction.valor
      : total - transaction.valor;
  }, 0);
  return total;
};
