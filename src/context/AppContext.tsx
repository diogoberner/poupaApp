import { createContext, useEffect, useState } from "react";
import { ITransactions, IUser } from "../types";
import {
  createTransaction,
  createUser,
  getAllTransactions,
  getAllUsers,
} from "../api";

interface AppContextType {
  usuario: IUser | null;
  addUser: (user: Omit<IUser, "orcamentoDiario">) => Promise<void>;
  transacoes: ITransactions[];
  addTransaction: (transaction: ITransactions, user: IUser) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<IUser | null>(null);
  const [transacoes, setTransacoes] = useState<ITransactions[]>([]);

  const getUser = async () => {
    try {
      const response = await getAllUsers();
      const transacoes = await getAllTransactions();
      if (response.length === 0) {
        return;
      }
      setUsuario(response[0]);
      setTransacoes(transacoes);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const addUser = async (user: Omit<IUser, "orcamentoDiario">) => {
    try {
      const newUser = await createUser(user);
      if (newUser) {
        setUsuario((prev) => ({ ...prev, ...newUser }));
      }
    } catch (error) {
      console.error("Erro ao adicionar novo usuário:", error);
    }
  };

  const addTransaction = async (transaction: ITransactions, user: IUser) => {
    try {
      if (!user) {
        throw new Error("Não podemos adicionar uma transação sem um usuário.");
      }
      const response = await createTransaction(transaction, user);

      if (response) {
        const { newTransaction, newDailyBudget } = response;
        setTransacoes((prev) => [...prev, newTransaction]);
        setUsuario((prev) =>
          prev
            ? {
                ...prev,
                orcamentoDiario: newDailyBudget,
              }
            : prev
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar nova transação:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ usuario, addUser, transacoes, addTransaction }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
