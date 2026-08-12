# Portfolio V3

Portfólio pessoal single-page de desenvolvedor full-stack. Landing page focada em conversão, com seções de serviços, casos de estudo, projetos e contato. Bilíngue (Português / Inglês) e com tema claro/escuro.

## ✨ Funcionalidades

- **Bilíngue (PT / EN)** — troca de idioma em tempo real, com preferência salva no `localStorage`.
- **Tema claro / escuro** — toggle manual, persistido no `localStorage`.
- **Single-page** — Header, Hero, Problemas, Serviços, Casos de Estudo, Diferenciais, Processo, Tech Stack, Projetos, CTA final e Footer.
- **Navegação flutuante** — menu flutuante + botão flutuante do WhatsApp.
- **Filtro de projetos** — busca por nome, linguagem ou tecnologia.
- **Formulário de contato** e animações de UI.

## 🛠️ Stack

| Camada       | Tecnologia                                    |
| ------------ | --------------------------------------------- |
| Framework    | React 18                                      |
| Build        | Vite 6                                         |
| Linguagem    | TypeScript                                     |
| Estilo       | Tailwind CSS v4 (`@tailwindcss/vite`)          |
| Componentes  | Radix UI + shadcn-style (`src/app/components/ui`) |
| Animação     | Motion                                         |
| Ícones       | Lucide React, MUI Icons                         |
| Gráficos     | Recharts                                        |

## 🚀 Rodando localmente

Pré-requisito: **Node.js 20+**.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# build de produção (gera ./dist)
npm run build
```

## 📁 Estrutura

```
src/
├── main.tsx                  # entry point, monta o React
├── app/
│   ├── App.tsx               # composição das seções da página
│   ├── context/
│   │   └── AppContext.tsx    # idioma, tema e traduções (i18n)
│   └── components/
│       ├── Header.tsx, Hero.tsx, Services.tsx, ...  # seções
│       ├── FloatingNav.tsx, FloatingWhatsApp.tsx
│       └── ui/               # componentes base (Radix / shadcn)
└── styles/                   # index.css, tailwind.css, theme.css, fonts.css
```

### Internacionalização

Todo o conteúdo de texto (e os dados de projetos e casos de estudo) fica em `src/app/context/AppContext.tsx`, no objeto `translations` (`en` / `pt`). Os componentes consomem via hook `useApp()` e a função `t('chave')`. Para adicionar ou editar textos, altere esse arquivo.

## 📦 Deploy

Deploy automático via **GitHub Actions** (`.github/workflows/deploy.yml`). A cada `push` na branch `master`:

1. `npm install`
2. `npm run build`
3. cópia de `dist/*` para o VPS (`/var/www/portfolio`) via SCP/SSH.

Secrets necessários no repositório: `REMOTE_HOST`, `REMOTE_USER`, `SSH_PRIVATE_KEY`.

## 📝 Licença

Projeto pessoal. Todos os direitos reservados.
