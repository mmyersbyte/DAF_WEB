<h1 align="center">Calculadora Tributária - NAF</h1>

<p align="center"><em>Projeto acadêmico desenvolvido para a disciplina Desenvolvimento de Aplicações com Frameworks Web.</em></p>

<div align="center">
  <img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <br>
  <img src="https://img.shields.io/badge/TAILWIND_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/REACT_ROUTER-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
  <br>
  <img src="https://img.shields.io/badge/CHART.JS-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/JSPDF-DC2626?style=for-the-badge&logoColor=white" alt="jsPDF">
  <img src="https://img.shields.io/badge/ASSISTANT_UI-111827?style=for-the-badge&logoColor=white" alt="assistant-ui">
</div>

<br>

<p align="center">
  <a href="https://github.com/mmyersbyte/DAF_backend">
    <img src="https://img.shields.io/badge/BACKEND-DAF_BACKEND-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Backend DAF">
  </a>
</p>

---

## Sobre o projeto

A **Calculadora Tributária - NAF** é uma aplicação web desenvolvida no âmbito da disciplina de **Desenvolvimento de Aplicações com Frameworks Web** da **Universidade Christus**.

O objetivo do projeto é permitir que o usuário compare, de forma simples e visual, a tributação entre **Pessoa Física (PF)** e **Pessoa Jurídica (PJ)** com base em regras didáticas para o ano de **2026**.

O usuário informa **renda mensal**, **custos mensais** e **profissão**. O frontend envia esses dados para o backend, que realiza o cálculo tributário, salva o histórico do comparativo no banco de dados e retorna o resultado para exibição na interface.

---

## Público-alvo e cenários

O sistema considera cenários didáticos para:

* **Psicólogo(a)** — PJ via Anexo III.
* **Arquiteto(a)** — PJ via Anexo III.
* **Advogado(a)** — PJ via Anexo IV, com lógica de CPP quando aplicável ao modelo.

> Este projeto possui finalidade acadêmica e didática. Os cálculos não substituem orientação profissional, contábil, fiscal ou jurídica.

---

## Funcionalidades

| Área                    | Descrição                                                                |
| ----------------------- | ------------------------------------------------------------------------ |
| **Simulação**           | Formulário com renda, custos e profissão.                                |
| **Comparativo PF × PJ** | Exibição de INSS, IRPF, DAS, totais e renda líquida aproximada.          |
| **Cálculo via backend** | O cálculo tributário é realizado pela API e não diretamente no frontend. |
| **Histórico**           | O backend salva os comparativos do usuário autenticado.                  |
| **Gráficos**            | Gráfico comparativo utilizando Chart.js.                                 |
| **PDF**                 | Exportação do resultado com html2canvas e jsPDF.                         |
| **Landing Page**        | Página inicial institucional com navegação para login e cadastro.        |
| **Autenticação**        | Login e cadastro integrados ao backend com JWT.                          |
| **Chatbot “Maurício”**  | Assistente integrado ao backend autenticado.                             |
| **Integração com API**  | Comunicação com o backend usando Axios.                                  |

---

## Tecnologias — Frontend

| Tecnologia                     | Uso                                      |
| ------------------------------ | ---------------------------------------- |
| **React 19**                   | Interface e componentes.                 |
| **Vite 7**                     | Build e servidor de desenvolvimento.     |
| **Tailwind CSS 4**             | Estilização da aplicação.                |
| **React Router 7**             | Controle de rotas.                       |
| **Axios**                      | Requisições HTTP para o backend.         |
| **Chart.js + react-chartjs-2** | Gráficos comparativos.                   |
| **@assistant-ui/react**        | Interface do chatbot.                    |
| **jsPDF + html2canvas**        | Geração de PDF.                          |
| **vite-plugin-svgr**           | Importação de SVG como componente React. |
| **animate.css**                | Animações auxiliares.                    |

---

## Backend utilizado

Este frontend está integrado ao backend principal do projeto:

```txt
https://github.com/mmyersbyte/DAF_backend
```

Durante o desenvolvimento local, o backend roda em:

```txt
http://localhost:3000
```

A comunicação com o backend é feita por meio da variável de ambiente:

```env
VITE_API_URL=http://localhost:3000
```

Documentação Swagger do backend:

```txt
http://localhost:3000/api-docs
```

---

## Integração com autenticação

O frontend realiza login e cadastro consumindo as rotas do backend:

| Método | Rota             | Descrição                    |
| ------ | ---------------- | ---------------------------- |
| POST   | `/auth/register` | Cadastro de usuário          |
| POST   | `/auth/login`    | Login e retorno do token JWT |

Após o login, o token JWT é armazenado no `localStorage` e enviado nas requisições protegidas pelo header:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

Essa abordagem foi utilizada para facilitar a integração no contexto acadêmico. Em um ambiente de produção, o ideal seria evoluir para cookies `httpOnly`.

---

## Integração tributária

O cálculo tributário foi movido para o backend. O frontend não realiza mais a regra principal de cálculo PF × PJ; ele apenas coleta os dados do formulário e envia para a API.

A rota consumida pelo frontend é:

```txt
POST /tax/compare
```

Exemplo de envio:

```json
{
  "rendaMensal": 10000,
  "custosMensais": 1500,
  "profissao": "Psicólogo"
}
```

O backend calcula o comparativo, salva o histórico no PostgreSQL e retorna o resultado para o frontend exibir.

Exemplo de resposta:

```json
{
  "message": "Comparativo calculado e salvo com sucesso.",
  "result": {
    "comparisonId": 1,
    "input": {
      "rendaMensal": 10000,
      "custosMensais": 1500,
      "profissao": "Psicólogo",
      "professionId": "psicologo"
    },
    "PF": {
      "imposto": 2528.73,
      "liquido": 7471.27
    },
    "PJ": {
      "totalImpostos": 908,
      "liquido": 9092
    },
    "bestOption": "PJ"
  }
}
```

O frontend também possui service preparado para consultar o histórico:

| Método | Rota                   | Descrição                                    |
| ------ | ---------------------- | -------------------------------------------- |
| POST   | `/tax/compare`         | Calcula e salva o comparativo tributário     |
| GET    | `/tax/comparisons`     | Lista os comparativos do usuário autenticado |
| GET    | `/tax/comparisons/:id` | Busca um comparativo tributário específico   |

---

## Integração com chatbot

O chatbot “Maurício” utiliza a interface do `@assistant-ui/react`, mas a resposta é gerada pelo backend.

A rota consumida pelo frontend é:

```txt
POST /chat/message
```

Exemplo de envio:

```json
{
  "content": "Olá, tudo bem?",
  "conversationId": 1
}
```

O `conversationId` é opcional. Caso não seja enviado, o backend cria uma nova conversa. Nas próximas mensagens, o frontend reutiliza o `conversationId` retornado.

---

## Estrutura principal do Frontend

```txt
frontend/

├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── app.jsx
    ├── index.css
    │
    ├── config/
    │   └── index.jsx
    │
    ├── services/
    │   ├── authService.js
    │   ├── chatService.js
    │   └── taxService.js
    │
    ├── pages/
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   └── Home.jsx
    │
    ├── components/
    │   ├── CalculatorForm.jsx
    │   ├── CompareResult.jsx
    │   ├── GraficoComparativo.jsx
    │   ├── FeatureCard.jsx
    │   ├── LandingHeader.jsx
    │   ├── LandingFooter.jsx
    │   ├── LogoIcon.jsx
    │   ├── InfoModal.jsx
    │   ├── FloatingChatBotButton.jsx
    │   └── chatbot/
    │       └── Chatbot.jsx
    │
    └── util/
        └── pdf/
            └── gerarPdfResultado.js
```

---

## Organização do frontend

O frontend segue uma organização simples por responsabilidades:

```txt
Pages → controlam o fluxo das telas
Components → exibem a interface
Services → fazem chamadas HTTP para o backend
Config → centraliza a instância do Axios
Util → funções auxiliares, como geração de PDF
```

Na tela principal, o fluxo funciona assim:

```txt
CalculatorForm
↓
Home.jsx
↓
taxService.js
↓
POST /tax/compare
↓
CompareResult.jsx
↓
GraficoComparativo + PDF
```

---

## Como executar

### Pré-requisitos

* Node.js instalado.
* Git instalado.
* Backend DAF rodando localmente.
* Docker e Docker Compose para o banco do backend.

---

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd DAF_WEB/frontend
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

---

### 4. Rodar o frontend

```bash
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

---

## Como rodar com o backend

Em outro terminal, execute o backend:

```bash
cd DAF_backend
docker compose up
npm run dev
```

O backend ficará disponível em:

```txt
http://localhost:3000
```

Documentação Swagger do backend:

```txt
http://localhost:3000/api-docs
```

---

## Fluxo de uso

1. Acessar a landing page.
2. Criar uma conta em cadastro.
3. Fazer login.
4. Acessar a tela principal.
5. Preencher renda, custos e profissão.
6. Enviar os dados para o backend.
7. Visualizar o comparativo PF × PJ.
8. Gerar PDF do resultado.
9. Usar o chatbot “Maurício” para tirar dúvidas.
10. Consultar o histórico pela API do backend, se necessário.

---

## Scripts disponíveis

```bash
npm run dev
```

Executa o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run preview
```

Visualiza localmente a build de produção.

---

## Observação legal e didática

Este projeto é um trabalho acadêmico e material de estudo. Os cálculos são aproximações didáticas para 2026 e não constituem parecer contábil, fiscal ou jurídico.

Para decisões reais, consulte um profissional habilitado e a legislação vigente.

---

## Informações acadêmicas

**Instituição:** Universidade Christus

**Disciplina:** Desenvolvimento de Aplicações com Frameworks Web

**Projeto:** Calculadora Tributária NAF

**Integração backend:** [DAF Backend](https://github.com/mmyersbyte/DAF_backend)
