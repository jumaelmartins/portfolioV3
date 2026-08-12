/**
 * Local i18n overlay for project descriptions.
 *
 * The Portfolio Manager API (`/public/portfolio`) stores a single description
 * per project (no language field). Until the CMS supports multi-language,
 * translated descriptions live here, keyed by the project's API `id`.
 *
 * Lookup order in useProjects(): overlay[id][language] -> API description.
 * To translate a new project: add an entry below with its API id.
 */
export type Lang = 'en' | 'pt';

export const projectDescriptions: Record<number, Record<Lang, string>> = {
  1: {
    en: 'Open-source CMS to manage your professional portfolio — résumé, projects, experience, education, courses, public roadmap, FAQ, improvement suggestions, and a public API to consume in personal sites or external portfolios.',
    pt: 'CMS open-source para gerenciar portfólio profissional — currículo, projetos, experiências, formações, cursos, roadmap público, FAQ, sugestões de melhoria e uma API pública para consumo em sites pessoais ou portfólios externos.',
  },
  2: {
    en: 'Multi-tenant barbershop SaaS with public online booking, a real WhatsApp AI booking agent, an internal copilot, and Stripe billing. Built with Next.js 16, Prisma, OpenAI, and the Evolution API.',
    pt: 'SaaS multi-tenant para barbearias com agendamento online público, agente de IA de agendamento real via WhatsApp, copiloto interno e cobrança com Stripe. Construído com Next.js 16, Prisma, OpenAI e Evolution API.',
  },
  3: {
    en: 'Multichannel helpdesk platform with ticketing, SLA tracking, webhooks, and bot commands. Backend in FastAPI + MongoDB, frontend in Next.js.',
    pt: 'Plataforma de helpdesk multicanal com tickets, controle de SLA, webhooks e comandos de bot. Backend em FastAPI + MongoDB, frontend em Next.js.',
  },
  4: {
    en: 'Third iteration of my personal developer portfolio — a React single-page site (Radix UI + Emotion) showcasing projects and experience.',
    pt: 'Terceira iteração do meu portfólio pessoal de desenvolvedor — um site React de página única (Radix UI + Emotion) apresentando projetos e experiência.',
  },
};

/**
 * The API has no emoji/accent fields, so both are derived from the project's
 * category. Keys are the UPPERCASED API category (e.g. "FULLSTACK").
 */
export const categoryEmoji: Record<string, string> = {
  FULLSTACK: '⚙️',
  FRONTEND: '🎨',
  BACKEND: '🔧',
  MOBILE: '📱',
  DEFAULT: '🚀',
};

export const categoryAccent: Record<string, string> = {
  FULLSTACK: '#f59e0b',
  FRONTEND: '#10b981',
  BACKEND: '#6366f1',
  MOBILE: '#ec4899',
  DEFAULT: '#2563eb',
};
