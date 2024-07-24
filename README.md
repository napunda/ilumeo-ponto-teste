Ilumeo Ponto API - README
Pré-requisitos
Node.js e npm (ou yarn) instalados https://nodejs.org/en/download/package-manager
Instalação
Clone o repositório do projeto.
Acesse a pasta do projeto.
Execute o comando npm install para instalar as dependências do projeto.
Scripts
O arquivo package.json define os scripts disponíveis para executar diferentes tarefas do projeto. Utilize o comando npm run <script> para executar um script específico.

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
