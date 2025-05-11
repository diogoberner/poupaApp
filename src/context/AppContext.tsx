import { createContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { createUser, getAllUsers } from "../api";

interface AppContextType {
  usuario: IUser | null;
  addUser: (user: IUser) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<IUser | null>(null);

  const getUser = async () => {
    try {
      const response = await getAllUsers();
      if (response.length === 0) {
        return;
      }
      setUsuario(response[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const addUser = async (user: IUser) => {
    try {
      const newUser = await createUser(user);
      if (newUser) {
        setUsuario((prev) => ({ ...prev, ...newUser }));
      }
    } catch (error) {
      console.error("Erro ao adicionar novo usuário:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider value={{ usuario, addUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
