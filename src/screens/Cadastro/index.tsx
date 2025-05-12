import { useState } from "react";
import {
  Section,
  Container,
  Title,
  Description,
  Illustration,
  SectionWrapper,
} from "./style.js";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { Form, useNavigate } from "react-router";
import Botao from "../../componentes/Botao/index.js";
import CampoTexto from "../../componentes/CampoTexto/index.js";
import Fieldset from "../../componentes/Fieldset/index.js";
import Label from "../../componentes/Label/index.js";
import { uid } from "../../utils.js";
import useAppContext from "../../context/useAppContext.js";
import { IUser } from "../../types/index.js";

const Cadastro = () => {
  const [form, setForm] = useState<Omit<IUser, "id" | "orcamentoDiario">>({
    nome: "",
    renda: 0,
  });
  const { addUser } = useAppContext();

  const navigate = useNavigate();

  const aoSubmeterFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();
    const usuario = {
      id: uid(),
      nome: form.nome,
      renda: Number(form.renda),
    };
    addUser(usuario);
    navigate("/home");
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar,
            precisamos de algumas informações sobre sua rotina financeira. Vamos
            lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="nome">Nome</Label>
              <CampoTexto
                type="text"
                name="nome"
                value={form.nome}
                onChange={onInputChange}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="renda">Renda mensal total</Label>
              <CampoTexto
                type="text"
                name="renda"
                value={form.renda}
                onChange={onInputChange}
              />
            </Fieldset>
          </Form>
          <Botao $variante="primario" onClick={aoSubmeterFormulario}>
            Ir para o app
          </Botao>
        </Container>
        <Illustration
          src={ilustracao}
          alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos"
        />
      </SectionWrapper>
    </Section>
  );
};

export default Cadastro;
