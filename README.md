# Portfolio V3

Portfólio pessoal single-page de engenheiro full-stack. Redesign "ink + violet":
tema escuro, tipografia Familjen Grotesk / JetBrains Mono, animações scroll-driven,
globo em canvas e marquee de stack. Bilíngue (Português / Inglês).

## ✨ Funcionalidades

- **Bilíngue (PT / EN)** — troca de idioma em tempo real (padrão PT), preferência salva no `localStorage`.
- **Single-page** — Header, Hero, Marquee de stack, Sobre, Serviços, Projetos, Cases, Blog, Contato e Footer.
- **Conteúdo dinâmico via CMS** — Projetos e a seção Sobre (Experiência / Formação) vêm da API pública do
  [portfolio-manager](https://github.com/jumaelmartins/portifolio_manager) (`GET /public/portfolio`), com estados de
  carregamento / erro / vazio.
- **Animações** — reveals com `animation-timeline: view()`, headline com máscara, barra de progresso de scroll,
  carrossel de serviços com scroll-snap e globo animado em `<canvas>`.
- **SEO** — title/description, canonical, hreflang PT/EN, Open Graph, `theme-color` e JSON-LD `Person` no `index.html`.

## 🛠️ Stack

| Camada     | Tecnologia                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | React 18                                               |
| Build      | Vite 6                                                 |
| Linguagem  | TypeScript                                             |
| Estilo     | CSS global (`src/styles/theme.css`) + estilos inline   |
| Fontes     | Google Fonts (Familjen Grotesk, Plus Jakarta Sans, JetBrains Mono) |
| Dados      | `fetch` da API pública do portfolio-manager            |

> As dependências pesadas herdadas do template (Radix UI, MUI, Recharts, Motion, etc.) não são mais usadas pelo
> redesign e podem ser removidas do `package.json` num passo de limpeza posterior.

## 🚀 Rodando localmente

Pré-requisito: **Node.js 20+**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em ./dist
```

### Variáveis de ambiente

Copie `.env.example` para `.env`. A chave da API **nunca** fica no código — vem do env (secret do GitHub Actions em CI,
ou `.env` local):

```
VITE_PM_API_URL=https://pm.jumadev.com
VITE_PM_API_KEY=pk_...            # chave pública (x-api-key)
VITE_PM_IMAGE_BASE=https://pm.jumadev.com
```

## 📁 Estrutura

```
src/
├── main.tsx                     # entry point, monta o React
├── app/
│   ├── App.tsx                  # providers + composição das seções
│   ├── context/
│   │   ├── AppContext.tsx       # idioma + traduções (i18n) do conteúdo estático
│   │   └── PortfolioContext.tsx # busca única de /public/portfolio (CMS)
│   ├── hooks/
│   │   ├── useProjects.ts       # projetos do CMS -> cards
│   │   └── useResume.ts         # experiência + formação do CMS
│   ├── data/projectDescriptions.ts  # overlay de descrições traduzidas (por id)
│   └── components/              # Header, Hero, Globe, About, Services, Projects, ...
└── styles/                      # index.css, theme.css, tailwind.css
```

### Internacionalização

O conteúdo estático (copy da página) fica em `src/app/context/AppContext.tsx`, no objeto `translations` (`pt` / `en`),
consumido via `useApp()` e `t('chave')`. Já os **dados do CMS** (projetos, experiência, formação) chegam prontos da API;
descrições de projeto podem ser traduzidas no overlay `projectDescriptions.ts`, indexado pelo `id` da API.

## 📦 Deploy

Deploy automático via **GitHub Actions** (`.github/workflows/deploy.yml`). A cada `push` na branch `master`:

1. `npm install`
2. `npm run build`
3. cópia de `dist/*` para o VPS (`/var/www/portfolio`) via SCP/SSH.

Secrets necessários: `REMOTE_HOST`, `REMOTE_USER`, `SSH_PRIVATE_KEY` e `VITE_PM_API_KEY`.

## 📝 Licença

Projeto pessoal. Todos os direitos reservados.
