import MoneyIcon from "../Icones/MoneyIcon";
import Transacao from "../Transacao";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import Botao from "../Botao";
import styled from "styled-components";
import { useRef, useState } from "react";
import Modal, { ModalHandler } from "../Modal";
import { Form } from "react-router";
import Label from "../Label";
import CampoTexto from "../CampoTexto";
import Fieldset from "../Fieldset";
import { SelectGroup, SelectOption } from "../Select";
import useAppContext from "../../context/useAppContext";
import { uid } from "../../utils";
import { ITransactions } from "../../types";

export const Container = styled(CartaoCorpo)`
  padding: var(--padding-l) var(--padding-m);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const ListaMovimentacoes = styled.ul`
  list-style: none;
  color: var(--cor-primaria);
  margin: 0;
  padding-left: 0px;
  padding-bottom: var(--padding-m);
  width: 100%;
  height: 535px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Transacoes = () => {
  const modalRef = useRef<ModalHandler>(null);
  const { transacoes, addTransaction } = useAppContext();

  const [novaTransacao, setNovaTransacao] = useState<Omit<ITransactions, "id">>(
    {
      nome: "",
      valor: 0,
      tipo: "",
      categoria: "",
      data: "",
    }
  );

  const adicionarTransacao = async () => {
    await addTransaction({ ...novaTransacao, id: uid() });
    setNovaTransacao({
      nome: "",
      valor: 0,
      tipo: "",
      categoria: "",
      data: "",
    });
    modalRef.current?.close();
  };

  return (
    <Cartao>
      <CartaoCabecalho>Movimentação financeira</CartaoCabecalho>
      <Container>
        <ListaMovimentacoes>
          {transacoes.map((transacao) => (
            <Transacao
              key={transacao.id}
              tipo={transacao.tipo}
              nome={transacao.nome}
              valor={transacao.valor}
              data={transacao.data}
            />
          ))}
        </ListaMovimentacoes>
        <Botao $variante="neutro" onClick={() => modalRef.current?.open()}>
          <MoneyIcon />
          Adicionar transação
        </Botao>
        <Modal
          ref={modalRef}
          titulo="Adicionar transação"
          icon={<MoneyIcon />}
          aoClicar={() => adicionarTransacao()}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="nomeTransacao">Nome da transação</Label>
              <CampoTexto
                type="text"
                id="nomeTransacao"
                placeholder="Ex: Compra na padaria"
                value={novaTransacao.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({ ...novaTransacao, nome: e.target.value })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Valor</Label>
              <CampoTexto
                type="number"
                id="valor"
                placeholder="10"
                value={novaTransacao.valor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    valor: parseFloat(e.target.value),
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="tipo">Tipo</Label>
              <SelectGroup
                id="tipo"
                value={novaTransacao.tipo}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    tipo: e.target.value as "" | "receita" | "despesa",
                  })
                }
              >
                <SelectOption value="">Selecione o tipo</SelectOption>
                <SelectOption value="receita">Receita</SelectOption>
                <SelectOption value="despesa">Despesa</SelectOption>
              </SelectGroup>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Data</Label>
              <CampoTexto
                type="date"
                id="valor"
                placeholder="dd/mm/aaaa"
                value={novaTransacao.data}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    data: e.target.value,
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="categoria">Categoria</Label>
              <CampoTexto
                type="text"
                id="categoria"
                placeholder="Alimentação"
                value={novaTransacao.categoria}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    categoria: e.target.value,
                  })
                }
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Transacoes;
