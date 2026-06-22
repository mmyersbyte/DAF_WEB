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

Aplicação desenvolvida no âmbito da disciplina de **Desenvolvimento de Aplicações com Frameworks Web** da **Universidade Christus**.

O objetivo do projeto é comparar, de forma simples e visual, a tributação entre **Pessoa Física (PF)** e **Pessoa Jurídica (PJ)** com base em regras didáticas para o ano de **2026**.

O usuário informa **renda mensal**, **custos mensais** e **profissão**. A ferramenta calcula impostos representativos e apresenta um comparativo entre regimes.

---

## Público-alvo e cenários

O sistema considera cenários didáticos para:

- **Psicólogo(a)** — PJ via Anexo III.
- **Arquiteto(a)** — PJ via Anexo III.
- **Advogado(a)** — PJ via Anexo IV, com lógica de CPP quando aplicável ao modelo.

Os valores e alíquotas seguem constantes documentadas nos arquivos do motor tributário em `src/util/tax/`.

> Este projeto possui finalidade acadêmica e didática. Os cálculos não substituem orientação profissional, contábil, fiscal ou jurídica.

---

## Funcionalidades

| Área                    | Descrição                                                         |
| ----------------------- | ----------------------------------------------------------------- |
| **Simulação**           | Formulário com renda, custos e profissão.                         |
| **Comparativo PF × PJ** | Tabela com INSS, IRPF, DAS, totais e renda líquida aproximada.    |
| **Gráficos**            | Gráfico comparativo utilizando Chart.js.                          |
| **PDF**                 | Exportação do resultado com html2canvas e jsPDF.                  |
| **Landing Page**        | Página inicial institucional com navegação para login e cadastro. |
| **Autenticação**        | Login e cadastro integrados ao backend com JWT.                   |
| **Chatbot “Maurício”**  | Assistente integrado ao backend autenticado.                      |
| **Integração com API**  | Comunicação com o backend usando Axios.                           |

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
    │   └── chatService.js
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
        ├── tax/
        │   ├── index.js
        │   ├── constants2026.js
        │   ├── professions.js
        │   ├── pf2026.js
        │   ├── pjServicos2026.js
        │   ├── pjAdvogado2026.js
        │   ├── irpfProgressive2026.js
        │   ├── compare.js
        │   └── round.js
        │
        └── pdf/
            └── gerarPdfResultado.js
```

---

## Como executar

### Pré-requisitos

- Node.js instalado.
- Git instalado.
- Backend DAF rodando localmente.
- Docker e Docker Compose para o banco do backend.

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
6. Visualizar o comparativo PF × PJ.
7. Gerar PDF do resultado.
8. Usar o chatbot “Maurício” para tirar dúvidas.

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
