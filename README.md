# 🚀 TaskFlow API

Uma API REST para gerenciamento de tarefas, permitindo a criação, atribuição e comentários em tasks. O projeto utiliza uma arquitetura baseada em serviços para manter o código limpo e escalável.

## 🛠️ Tecnologias Utilizadas
- **Runtime:** Node.js v20
- **Linguagem:** TypeScript
- **Framework:** Express 5
- **ORM:** Prisma (PostgreSQL)
- **Validação:** Zod
- **Containerização:** Docker & Docker Compose
- **Autenticação:** JWT & BcryptJS

## 🏗️ Arquitetura
O projeto segue o padrão de separação de preocupações:
- **Routes:** Definição dos endpoints.
- **Controllers:** Orquestração das requisições e respostas.
- **Services:** Regras de negócio e comunicação com o banco de dados.
- **Schemas:** Validação de dados com Zod.

---

## 🚦 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/task-api.git](https://github.com/seu-usuario/task-api.git)
    cd task-api
    ```

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz (use o `.env.example` se houver) e configure a `DATABASE_URL`.

3.  **Suba os containers:**
    ```bash
    docker-compose up --build
    ```
    *O comando acima já executa as migrations do Prisma (`db push`) e inicia o servidor em modo de desenvolvimento.*

A API estará disponível em `http://localhost:3000`.

---

## 📌 Endpoints Principais

### Tarefas (Tasks)
- `POST /tasks` - Cria uma nova tarefa.
- `GET /tasks` - Lista todas as tarefas.
- `GET /tasks/assigned/me` - Lista tarefas atribuídas ao usuário logado.
- `GET /tasks/user/:userId` - Lista tarefas de um usuário específico.
- `PATCH /tasks/:id/status` - Atualiza apenas o status de uma tarefa.

### Comentários
- `POST /tasks/:id/comments` - Adiciona um comentário a uma tarefa.
- `GET /tasks/:id/comments` - Lista comentários de uma tarefa.

---

## 📄 Licença
Este projeto está sob a licença ISC.
