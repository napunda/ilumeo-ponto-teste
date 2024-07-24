
# Ilumeo Ponto API - README

## Pré-requisitos

- Node.js e npm (ou yarn) instalados [Node.js Download](https://nodejs.org/en/download/package-manager)

## Instalação

1. Clone o repositório do projeto.
2. Acesse a pasta do projeto.
3. Execute o comando `npm install` para instalar as dependências do projeto.

## Scripts

O arquivo `package.json` define os scripts disponíveis para executar diferentes tarefas do projeto. Utilize o comando `npm run <script>` para executar um script específico.

| Script | Descrição |
|---|---|
| start | Inicia o servidor da API em modo de desenvolvimento. |
| start:prod | Inicia o servidor da API em modo produção. |
| dev | Inicia o servidor da API em modo de desenvolvimento com monitoramento de alterações nos arquivos. |
| build | Compila o projeto para produção. |
| lint | Executa a análise de código estático. |
| lint-fix | Corrige automaticamente os problemas identificados pela análise de código estático (se possível). |
| format | Formata o código fonte de acordo com o estilo definido. |
| prepare | Executa as tarefas de preparação antes de um commit. |
| test:custom | Executa um teste unitário específico. |
| precommit | Executa as tarefas `lint-fix` e `format` antes de um commit. |
| prepush | Executa a tarefa `lint` antes de um push. |
| test | Executa todos os testes unitários. |
| test:watch | Executa os testes unitários em modo watch, executando novamente os testes a cada alteração nos arquivos. |


Para fazer testes para a api utilize o usuário e senha:

{
	"username": "napunda#",
  "password": "napunda23"
}

As rotas principais da API estão disposta nessa collection do POSTMAN:
[Link da Collection](https://api.postman.com/collections/30363557-9c0f1e29-2931-44d0-863f-4a263561334e?access_key=PMAT-01J3JB6SFR7C3GB21843B5TNF2)
