# PolpaApp - Gerenciador Financeiro

O **PolpaApp** é uma aplicação de gerenciamento financeiro que desenvolvi para praticar conceitos de **React** e **TypeScript**, com foco em gerenciamento de estados utilizando a **Context API**. A ideia do projeto é criar uma solução simples e eficiente para ajudar usuários a controlar suas finanças pessoais.

## Funcionalidades

- **Tela de Inscrição**: O usuário pode inscrever seu nome e renda mensal.
- **Dashboard**: Após o login, o usuário é levado para o dashboard, onde são exibidos:
  - Seu nome.
  - Orçamento diário disponível.
  - Gráfico de gastos por categoria.
  - Lista de transações financeiras do dia.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção da interface.
- **TypeScript**: Tipagem forte para garantir a consistência e a confiabilidade do código.
- **Context API**: Gerenciamento de estados globais da aplicação, evitando o **prop drilling**.
- **JSON Server**: Utilizado para simular uma API fake e persistir dados entre recargas da página.
- **Axios**: Para realizar chamadas HTTP e integrar a aplicação com a API.

## Funcionalidades Desenvolvidas

### 1. Criação de Modal Reutilizável

- Refatoração de uma modal para torná-la reutilizável e controlável utilizando **useRef** e **useImperativeHandle**.
- Implementação de acessibilidade, permitindo navegação através da tecla **Tab** e fechamento com **Esc**.

### 2. Back-End com JSON Server

- Configuração de uma API fake utilizando **JSON Server**.
- Criação de endpoints para **usuários** e **transações**.
- Utilização de **Axios** para fazer chamadas HTTP com tipagem **TypeScript**.

### 3. Gerenciamento de Estado com Context API

- Criação de um **contexto global** com **createContext** e **AppProvider** para centralizar estados e funções.
- Implementação de um **hook customizado (useAppContext)** para garantir acesso seguro ao contexto global.

### 4. Gerenciamento de Transações e Orçamento Diário

- Gerenciamento das transações do usuário com **useState** e **iTransações**.
- Cálculo automático do **orçamento diário** disponível.
- Integração da API com o estado global utilizando a **Context API**.

### 5. Exibição de Gastos por Categoria

- Cálculo do **saldo do usuário** e atualização dinâmica do orçamento diário.
- Exibição dos gastos organizados por categoria, com gráficos.
- Utilização de **useMemo** para otimização de cálculos e manipulação de dados.

### 6. Aprendizados

- Este projeto foi desenvolvido como parte do meu aprendizado em um curso da Alura e abordou conceitos importantes como:
- Gerenciamento de estados globais com a Context API.
- Tipagem forte com TypeScript para aumentar a confiabilidade do código.
- Criação de modais reutilizáveis e acessíveis.
- Integração com uma API fake usando JSON Server.

Espero que este projeto sirva como uma boa base para aplicações mais complexas e me ajude a continuar aprimorando minhas habilidades em React e TypeScript!
