import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface ServiceItem {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  price: string;
  featured?: boolean;
}
interface CaseItem {
  client: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
}
interface BlogPost {
  tag: string;
  title: string;
}

const translations: Record<Language, Record<string, any>> = {
  pt: {
    // Header
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.projects': 'Projetos',
    'nav.blog': 'Blog',
    'nav.contact': 'Falar comigo',

    // Hero
    'hero.badge': 'Disponível para novos projetos',
    'hero.title1': 'Software que remove',
    'hero.title2': 'o trabalho manual',
    'hero.title3': 'do seu negócio.',
    'hero.subtitle':
      'Full Stack Software Engineer, +3 anos de experiência. Projeto e entrego aplicações web, APIs e sistemas de automação — da arquitetura à produção.',
    'hero.cta1': 'Agendar conversa',
    'hero.cta2': 'Ver projetos',
    'hero.focus': 'APIs · automação · IA',
    'hero.base': 'Brasil · remoto global',
    'hero.stat1': 'Projetos entregues',
    'hero.stat2': 'Anos de experiência',

    // About
    'about.kicker': '01 — Sobre',
    'about.role': 'Full Stack Software Engineer',
    'about.location': 'Salvador, BA — Brasil',
    'about.headline': 'Construo a camada entre o negócio e seus sistemas.',
    'about.body':
      'Três anos entregando produtos full-stack: SaaS multi-tenant, dashboards internos, APIs REST, bots de WhatsApp e agentes de IA. Trabalho de ponta a ponta — arquitetura, modelo de dados, interface, deploy — e documento o que entrego.',
    'about.experience': 'Experiência',
    'about.education': 'Formação',
    'about.present': 'presente',
    'about.loading': 'Carregando…',
    'about.expEmpty': 'Experiências em breve.',
    'about.eduEmpty': 'Formação em breve.',

    // Services
    'services.kicker': '02 — Serviços',
    'services.headline': 'Cinco formas de trabalhar comigo.',
    'services.hint': 'Arraste ou use as setas',
    'services.from': 'a partir de',
    'services.onRequest': 'sob consulta',
    'services.items': [
      { n: '01', title: 'Produto & MVP', desc: 'Da ideia ao produto rodando: arquitetura, banco, interface, deploy. Escopo enxuto, entregas semanais.', tags: ['Next.js', 'Prisma', 'Stripe'], price: 'a partir de' },
      { n: '02', title: 'APIs & integrações', desc: 'APIs REST com arquitetura de verdade, documentação e versionamento. Integrações com ERP, CRM, gateways de pagamento e WhatsApp.', tags: ['Node.js', 'FastAPI', 'PostgreSQL'], price: 'a partir de', featured: true },
      { n: '03', title: 'Automação & IA', desc: 'Bots, workflows e agentes de IA que cortam trabalho manual. Um cliente reduziu 80% da rotina de relatórios.', tags: ['Python', 'OpenAI', 'WhatsApp API'], price: 'a partir de' },
      { n: '04', title: 'Criação de sites', desc: 'Sites institucionais e landing pages feitos para serem encontrados e converter: páginas rápidas, SEO técnico, analytics e um CMS que você mesmo edita.', tags: ['Next.js', 'SEO', 'CMS'], price: 'a partir de' },
      { n: '05', title: 'Consultoria', desc: 'Revisão técnica do que você já roda: arquitetura, banco, custo e performance — com um plano escrito do que corrigir primeiro e por quê.', tags: ['Code review', 'Arquitetura', 'Infra'], price: 'por hora / por projeto' },
    ] as ServiceItem[],

    // Projects
    'projects.kicker': '03 — Projetos selecionados',
    'projects.more': 'Ver mais projetos no GitHub',
    'projects.loading': 'Carregando projetos…',
    'projects.error': 'Não foi possível carregar os projetos. Tente novamente mais tarde.',
    'projects.empty': 'Nenhum projeto por aqui ainda.',
    'projects.source': 'Código no GitHub',
    'projects.live': 'Ver ao vivo',
    'projects.video': 'Ver vídeo',
    'projects.videoClose': 'Fechar vídeo',
    'projects.demoSoon': 'Demo ao vivo em breve',

    // Case studies
    'cases.items': [
      { client: 'Case · ONDACOM', title: 'BOT de relatórios no WhatsApp', body: 'A equipe operacional carecia de informação para decidir e gastava horas gerando relatórios à mão. Construí um bot de automação no WhatsApp entregando os números que precisam, de forma clara.', stats: [ { value: '80%', label: 'menos trabalho manual' }, { value: '3x', label: 'relatórios mais rápidos' } ] },
      { client: 'Case · I-SYSTEMS', title: 'Dashboard interno & analytics', body: 'Sem visão centralizada das métricas principais — a equipe gastava horas compilando relatórios de fontes diferentes. Construí um dashboard em tempo real agregando todas as fontes com visualizações personalizadas.', stats: [ { value: '90%', label: 'relatórios mais rápidos' }, { value: 'tempo real', label: 'insights de negócio' } ] },
    ] as CaseItem[],

    // Blog
    'blog.kicker': '04 — Blog',
    'blog.headline': 'Anotações de produção.',
    'blog.subtitle': 'Primeiros artigos em produção. Temas que estou escrevendo:',
    'blog.posts': [
      { tag: 'Em breve', title: 'Multi-tenancy com Prisma sem dar tiro no pé' },
      { tag: 'Em breve', title: 'Um agente de IA no WhatsApp que realmente agenda' },
      { tag: 'Em breve', title: 'Projetando uma API pública para o próprio portfólio' },
    ] as BlogPost[],

    // Contact
    'contact.kicker': '05 — Contato',
    'contact.headline': 'Me conte o que precisa ser construído.',
    'contact.subtitle': 'Conversa de 30 minutos, sem custo. Resposta em até 24h.',

    // Footer
    'footer.tagline': 'Full Stack Software Engineer · Brasil · remoto global',
  },
  en: {
    // Header
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Work',
    'nav.blog': 'Writing',
    'nav.contact': 'Get in touch',

    // Hero
    'hero.badge': 'Available for new projects',
    'hero.title1': 'Software that removes',
    'hero.title2': 'the manual work',
    'hero.title3': 'from the business.',
    'hero.subtitle':
      'Full Stack Software Engineer, +3 years of experience. I design and ship web applications, APIs, and automation systems — from architecture to production.',
    'hero.cta1': 'Book a call',
    'hero.cta2': 'See the work',
    'hero.focus': 'APIs · automation · AI',
    'hero.base': 'Brazil · remote worldwide',
    'hero.stat1': 'Projects delivered',
    'hero.stat2': 'Years of experience',

    // About
    'about.kicker': '01 — About',
    'about.role': 'Full Stack Software Engineer',
    'about.location': 'Salvador, BA — Brazil',
    'about.headline': 'I build the layer between the business and its systems.',
    'about.body':
      'Three years shipping full-stack products: multi-tenant SaaS, internal dashboards, REST APIs, WhatsApp bots, and AI agents. I work end to end — architecture, data model, interface, deploy — and I document what I hand over.',
    'about.experience': 'Experience',
    'about.education': 'Education',
    'about.present': 'present',
    'about.loading': 'Loading…',
    'about.expEmpty': 'Experience coming soon.',
    'about.eduEmpty': 'Education coming soon.',

    // Services
    'services.kicker': '02 — Services',
    'services.headline': 'Five ways I get hired.',
    'services.hint': 'Drag or use the arrows',
    'services.from': 'from',
    'services.onRequest': 'on request',
    'services.items': [
      { n: '01', title: 'Product & MVP', desc: 'From idea to a running product: architecture, database, interface, deploy. Focused scope, weekly deliveries.', tags: ['Next.js', 'Prisma', 'Stripe'], price: 'from' },
      { n: '02', title: 'APIs & integrations', desc: 'REST APIs with real architecture, documentation, and versioning. ERP, CRM, payment gateway, and WhatsApp integrations.', tags: ['Node.js', 'FastAPI', 'PostgreSQL'], price: 'from', featured: true },
      { n: '03', title: 'Automation & AI', desc: 'Bots, workflows, and AI agents that cut manual work. One client dropped 80% of the report routine.', tags: ['Python', 'OpenAI', 'WhatsApp API'], price: 'from' },
      { n: '04', title: 'Website design & build', desc: 'Institutional sites and landing pages built to be found and to convert: fast pages, technical SEO, analytics, and a CMS you can edit yourself.', tags: ['Next.js', 'SEO', 'CMS'], price: 'from' },
      { n: '05', title: 'Consulting', desc: 'Technical review of what you already run: architecture, database, cost, and performance — with a written plan of what to fix first and why.', tags: ['Code review', 'Architecture', 'Infra'], price: 'hourly / project' },
    ] as ServiceItem[],

    // Projects
    'projects.kicker': '03 — Selected work',
    'projects.more': 'More projects on GitHub',
    'projects.loading': 'Loading projects…',
    'projects.error': "Couldn't load projects. Please try again later.",
    'projects.empty': 'No projects here yet.',
    'projects.source': 'Source code',
    'projects.live': 'View live',
    'projects.video': 'Watch video',
    'projects.videoClose': 'Close video',
    'projects.demoSoon': 'Live demo soon',

    // Case studies
    'cases.items': [
      { client: 'Case · ONDACOM', title: 'WhatsApp report bot', body: 'The operations team lacked information to decide and spent hours generating reports by hand. I built an automation bot on their WhatsApp delivering the numbers they need, clearly.', stats: [ { value: '80%', label: 'less manual work' }, { value: '3x', label: 'faster reports' } ] },
      { client: 'Case · I-SYSTEMS', title: 'Internal dashboard & analytics', body: 'No centralized view of key metrics — the team spent hours compiling reports from different sources. I built a real-time dashboard aggregating every source with custom visualizations.', stats: [ { value: '90%', label: 'faster reporting' }, { value: 'real time', label: 'business insights' } ] },
    ] as CaseItem[],

    // Blog
    'blog.kicker': '04 — Writing',
    'blog.headline': 'Notes from production.',
    'blog.subtitle': "First articles in progress. Topics I'm writing about:",
    'blog.posts': [
      { tag: 'Soon', title: 'Multi-tenancy with Prisma without shooting yourself in the foot' },
      { tag: 'Soon', title: 'A WhatsApp AI agent that actually books appointments' },
      { tag: 'Soon', title: 'Designing a public API for your own portfolio' },
    ] as BlogPost[],

    // Contact
    'contact.kicker': '05 — Contact',
    'contact.headline': 'Tell me what needs to be built.',
    'contact.subtitle': 'Free 30-minute call. Reply within 24h.',

    // Footer
    'footer.tagline': 'Full Stack Software Engineer · Brazil · remote worldwide',
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved === 'en' || saved === 'pt') setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

  const t = (key: string): any => translations[language][key] ?? key;

  return (
    <AppContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
