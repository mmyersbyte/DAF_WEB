# Calculadora Tributária (NAF)

## Sobre o projeto

Aplicação desenvolvida no âmbito da cadeira de **Desenvolvimento e Aplicações e Frameworks Web** (Unichristus – Dom Luis). Objetivo: **comparar tributação entre Pessoa Física (PF) e Pessoa Jurídica (PJ)** de forma simples e visual, com base em **regras didáticas para o ano de 2026**.

O utilizador informa **renda mensal**, **custos mensais** e **profissão**. A ferramenta calcula impostos representativos e mostra um comparativo entre regimes.

### Público-alvo e cenários (2026)

- **Psicólogo(a)** e **Arquiteto(a)** — PJ via **Anexo III** (serviços).
- **Advogado(a)** — PJ via **Anexo IV** (com lógica de CPP quando aplicável ao modelo).

Os valores e alíquotas seguem constantes documentadas em `util/tax/constants2026.js` e módulos específicos de PF/PJ (uso **didático**, não substitui orientação profissional ou legislação oficial consolidada).

---

## Funcionalidades

| Área | Descrição |
|------|-----------|
| **Simulação** | Formulário com renda, custos e profissão (Psicologia, Arquitetura, Advocacia). |
| **Comparativo PF × PJ** | Tabela com INSS, IRPF, DAS (PJ), totais e renda líquida aproximada. |
| **Gráficos** | Gráfico comparativo (Chart.js). |
| **PDF** | Exportação do resultado (html2canvas + jsPDF). |
| **Landing** | Página inicial institucional com navegação para login/registo. |
| **Autenticação** | Login e registo integrados ao backend (JWT / PostgreSQL). |
| **E-mail NAF** | Envio de resultados por e-mail para o Núcleo de Apoio Contábil e Fiscal. |
| **Chatbot “Maurício”** | Assistente no canto da aplicação (**assistant-ui** + API dedicada no backend, Groq). |

---

## Tecnologias — Frontend

| Tecnologia | Uso |
|------------|-----|
| **React 19** | Interface e componentes. |
| **Vite 7** | Build e servidor de desenvolvimento. |
| **Tailwind CSS 4** | Estilização utilitária (`@tailwindcss/vite`, `src/index.css`). |
| **React Router 7** | Rotas (landing, login, registo, home). |
| **Chart.js** + **react-chartjs-2** | Gráfico comparativo. |
| **axios** | Chamadas HTTP (API principal e chatbot). |
| **@assistant-ui/react** | Interface do chat (runtime local + primitivos de thread/composer). |
| **jspdf** + **html2canvas** | Geração de PDF a partir do resultado na página. |
| **vite-plugin-svgr** | Importação de SVG como componentes React (`?react`). |
| **animate.css** | Animações auxiliares onde aplicável. |

> **Nota:** O projeto **não utiliza Bootstrap**; o layout é **Tailwind**.

---

## Estrutura principal do Frontend

```
frontend/
├── index.html
├── package.json
├── vite.config.js          # React plugin, Tailwind, SVGR
└── src/
    ├── main.jsx            # Entrada React
    ├── app.jsx             # Rotas (BrowserRouter)
    ├── index.css           # Tailwind + variáveis CSS (:root)
    ├── config/             # Configuração partilhada (ex.: API base)
    ├── pages/
    │   ├── Landing.jsx     # Página inicial pública
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   └── Home.jsx        # Calculadora + chatbot (FAB)
    ├── components/
    │   ├── CalculatorForm.jsx
    │   ├── CompareResult.jsx      # Resultado, PDF, e-mail
    │   ├── GraficoComparativo.jsx
    │   ├── FeatureCard.jsx
    │   ├── LandingHeader.jsx / LandingFooter.jsx
    │   ├── LogoIcon.jsx
    │   ├── InfoModal.jsx
    │   ├── button.jsx / input.jsx / text.jsx
    │   ├── FloatingChatBotButton.jsx
    │   └── chatbot/
    │       └── Chatbot.jsx        # assistant-ui + POST /chat
    └── util/
        ├── tax/                   # Motor de cálculo 2026
        │   ├── index.js           # compareTaxes, exports
        │   ├── constants2026.js
        │   ├── professions.js
        │   ├── pf2026.js
        │   ├── pjServicos2026.js  # Psicólogo / Arquiteto
        │   ├── pjAdvogado2026.js
        │   ├── irpfProgressive2026.js
        │   ├── compare.js
        │   └── round.js
        └── pdf/
            └── gerarPdfResultado.js
```

Variável opcional no frontend: **`VITE_CHATBOT_URL`** — URL base do serviço de chat (por defeito `http://localhost:3000` no código do `Chatbot.jsx`).

---

## Tecnologias — Backend (resumo)

- **Node.js** + **Express** — API principal (auth, e-mail, etc.).
- **PostgreSQL** + **Prisma** — persistência.
- **JWT** + **bcrypt** — autenticação.
- **Nodemailer** — envio de e-mails.
- **Serviço de chat** (`src/chatbot/index.js`) — **Groq** (`groq-sdk`), prompt em `src/chatbot/prompts/systems.txt`, porta **3000**.

---

## Como executar

### Pré-requisitos

- Node.js 18+ recomendado  
- Docker e Docker Compose (PostgreSQL)  
- Git  

### Backend (API principal)

```bash
cd backend
npm install
cp .env.example .env   # se existir; configure DB, JWT, e-mail, FRONTEND_URL
docker compose up -d    # ou docker-compose conforme o projeto
npm run db:init
npm run dev             # http://localhost:5000 (ou PORT no .env)
```

### Chatbot (opcional, serviço à parte)

```bash
cd backend
# No .env: GROQ_API_KEY=...
npm run dev:chatbot     # http://localhost:3000 — POST /chat
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

Para produção do frontend: `npm run build` e servir a pasta `dist/`.

---

## Estrutura principal do Backend

- `src/server.js` — API Express (porta 5000 por defeito).  
- `src/routes/` — Rotas (auth, e-mail, …).  
- `src/controllers/` — Controladores.  
- `src/middleware/` — Autenticação JWT.  
- `src/config/` — Base de dados, e-mail.  
- `src/services/` — PDF, e-mail.  
- `src/chatbot/` — Servidor do assistente (Groq).  
- `docker-compose.yml` — PostgreSQL.  
- `prisma` / `migrations` — Esquema e migrações (conforme configuração do repositório).  

---

## Observação legal e didática

Este projeto é **trabalho académico** e material de **estudo**. Os cálculos são **aproximações didáticas** para 2026 e **não** constituem parecer contabilístico, fiscal ou jurídico. Para decisões reais, consulte um profissional habilitado e a legislação vigente.
