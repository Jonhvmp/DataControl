# Data Control

**Link do Deploy**: [Data Control no Vercel](https://data-control-three.vercel.app/)

## Descrição do Projeto

O **Data Control** é uma aplicação de gerenciamento de cadastros. Com funcionalidades básicas de CRUD (Create, Read, Update, Delete) e exportação para CSV, ele permite que o usuário registre informações básicas como nome, idade e e-mail, oferecendo uma interface prática para manipulação desses dados.

## Funcionalidades

- **Cadastro de Usuários**: Insere dados como nome, idade e e-mail.
- **Visualização de Cadastros**: Exibe a lista de cadastros com detalhes e a opção de visualização individual.
- **Edição e Exclusão**: Permite que o usuário edite ou exclua cadastros.
- **Exportação para CSV**: Exporta os dados dos cadastros para um arquivo CSV, facilitando o backup ou uso externo.
- **Tema Escuro/Claro**: Alterna entre temas, conforme a preferência do usuário.

## Estrutura do Projeto

- **index.html**: Contém a estrutura básica da página e os componentes de interface como o formulário de cadastro e a lista de cadastros.
- **main.js**: Script principal que inicializa a aplicação, configura o tema e gerencia a exportação de dados.
- **store.js**: Gerencia o banco de dados utilizando IndexedDB para armazenamento local dos cadastros.
- **FormCadastro.js**: Controla o formulário de cadastro, valida as entradas e interage com o armazenamento.
- **ListRegisters.js**: Exibe a lista de cadastros, permitindo visualização e interação.
- **CardDetails.js**: Mostra os detalhes de cada cadastro em uma interface de cartão com botões de edição e exclusão.

## Documentação e Recursos

Aqui estão alguns dos principais métodos e lógicas implementados no projeto:

- **IndexedDB**: Utilizado para armazenamento local dos cadastros.
  - [Documentação IndexedDB - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

- **Manipulação do DOM**: Criação dinâmica de elementos, exibição de mensagens e controle de exibição de componentes.
  - [Documentação DOM - W3Schools](https://www.w3schools.com/js/js_htmldom.asp)

- **Exportação de Dados para CSV**: Implementado usando a API de `Blob` para criar e baixar arquivos CSV.
  - [Criando arquivos com Blob - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

- **Tema Claro/Escuro**: Implementado com armazenamento da preferência de tema usando `localStorage`.
  - [Documentação localStorage - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

- **Funções de CRUD**: Funções para adicionar, atualizar e excluir registros do banco de dados.
  - [IndexedDB - Transações e Operações CRUD](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

## Como Executar o Projeto Localmente

1. Clone o repositório.
2. Abra o arquivo `index.html` em um navegador compatível (recomenda-se Chrome ou Firefox).
3. Para testar a persistência dos dados, adicione cadastros e veja a lista de registros sendo atualizada automaticamente.

## Licença

Este projeto é distribuído sob a licença MIT.
