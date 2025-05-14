import { useMemo } from "react";
import useAppContext from "../context/useAppContext";

const useExpensesByCategories = () => {
  const { transacoes } = useAppContext();

  const expensesByCategories = useMemo(() => {
    return transacoes
      .filter((transacao) => transacao.tipo === "despesa")
      .reduce<Record<string, number>>((total, transacao) => {
        total[transacao.categoria] =
          (total[transacao.categoria] || 0) + transacao.valor;
        return total;
      }, {});
  }, [transacoes]);

  return expensesByCategories;
};

export default useExpensesByCategories;
