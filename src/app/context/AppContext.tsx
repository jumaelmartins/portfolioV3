import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  en: {
    // Header
    'nav.services': 'Services',
    'nav.cases': 'Case Studies',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.available': 'Available for new projects',
    'hero.title1': 'I build',
    'hero.title2': 'scalable',
    'hero.title3': 'web applications',
    'hero.subtitle': 'Full-stack development, APIs, and automation systems for startups and growing businesses.',
    'hero.description': 'Helping companies reduce manual work, improve efficiency, and launch digital products faster.',
    'hero.cta1': 'Book a Call',
    'hero.cta2': 'Request a Quote',
    'hero.proof1': 'Projects Delivered',
    'hero.proof2': 'Automation Systems',
    
    // Problems
    'problems.title': 'Do you need to...',
    'problems.subtitle': 'I help solve these common business challenges',
    'problems.1': 'Automate internal processes and reduce manual work?',
    'problems.2': 'Build a custom dashboard or internal tool?',
    'problems.3': 'Create a scalable backend or REST/GraphQL API?',
    'problems.4': 'Launch an MVP fast to validate your idea?',
    'problems.5': 'Integrate systems (ERP, CRM, payment gateways)?',
    'problems.6': 'Scale your existing application infrastructure?',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'End-to-end development services to help your business grow',
    'services.web.title': 'Custom Web Development',
    'services.web.desc': 'Full-stack applications, dashboards, and client portals built with modern frameworks and best practices.',
    'services.api.title': 'API Development',
    'services.api.desc': 'RESTful and GraphQL APIs with proper architecture, documentation, and scalability from day one.',
    'services.automation.title': 'Automation & Integrations',
    'services.automation.desc': 'Custom workflows, bots, and system integrations to reduce manual work and improve efficiency.',
    'services.mvp.title': 'MVP Development',
    'services.mvp.desc': 'Fast and focused product development to validate your business idea and get to market quickly.',
    
    // Why Work With Me
    'why.title': 'Why Work With Me',
    'why.subtitle': 'Professional development services you can trust',
    'why.architecture': 'Clean Architecture',
    'why.architecture.desc': 'Well-structured, maintainable code that stands the test of time',
    'why.delivery': 'Fast Delivery',
    'why.delivery.desc': 'Agile development with weekly milestones and regular updates',
    'why.communication': 'Clear Communication',
    'why.communication.desc': 'Regular check-ins, transparent progress tracking, and quick responses',
    'why.documentation': 'Documentation Included',
    'why.documentation.desc': 'Comprehensive documentation for easy handoff and future maintenance',
    'why.support': 'Long-term Support',
    'why.support.desc': 'Post-launch support and maintenance to keep your app running smoothly',
    'why.quality': 'Quality Guaranteed',
    'why.quality.desc': 'Thorough testing and code reviews before every deployment',
    
    // Process
    'process.title': 'How I Work',
    'process.subtitle': 'A proven process for successful project delivery',
    'process.discovery.title': 'Discovery',
    'process.discovery.desc': 'Understanding your business goals, challenges, and technical requirements',
    'process.discovery.duration': '1-2 days',
    'process.planning.title': 'Planning',
    'process.planning.desc': 'Architecture design, technology stack selection, and detailed roadmap',
    'process.planning.duration': '3-5 days',
    'process.development.title': 'Development',
    'process.development.desc': 'Agile development with weekly deliverables and regular progress updates',
    'process.development.duration': '2-8 weeks',
    'process.launch.title': 'Launch',
    'process.launch.desc': 'Deployment, testing, documentation, and knowledge transfer',
    'process.launch.duration': '3-5 days',
    'process.iteration.title': 'Iteration',
    'process.iteration.desc': 'Ongoing improvements, bug fixes, and feature enhancements',
    'process.iteration.duration': 'Ongoing',
    
    // Tech Stack
    'tech.title': 'Tech Stack',
    'tech.subtitle': 'Modern technologies for robust, scalable applications',
    'tech.more': '+ Many other tools and frameworks based on project needs',
    
    // Case Studies
    'cases.title': 'Case Studies',
    'cases.subtitle': 'Real projects, real results',
    'cases.button': 'View full case study',
    'cases.problem': 'Problem',
    'cases.solution': 'Solution',
    'cases.results': 'Results',
    
    // Projects
    'projects.title': 'PROJECTS.',
    'projects.filters': 'FILTERS:',
    'projects.search': 'Search by name, language or technologies...',
    'projects.notfound': 'No projects found with these filters.',
    
    // Final CTA
    'cta.title1': "Let's build something",
    'cta.title2': 'great together',
    'cta.subtitle': 'Ready to start your project? Schedule a free consultation call or request a detailed quote.',
    'cta.button1': 'Book a Free Call',
    'cta.button2': 'Request a Quote',
    'cta.availability': 'Available for new projects · Response within 24h',
    
    // Footer
    'footer.description': 'Full-stack developer building scalable web applications and automation systems.',
    'footer.links': 'Quick Links',
    'footer.home': 'Home',
    'footer.contact.title': 'Get in Touch',
    'footer.send': 'Send Message',
    'footer.rights': 'All rights reserved.',
  },
  pt: {
    // Header
    'nav.services': 'Serviços',
    'nav.cases': 'Casos de Estudo',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.available': 'Disponível para novos projetos',
    'hero.title1': 'Eu construo',
    'hero.title2': 'aplicações web',
    'hero.title3': 'escaláveis',
    'hero.subtitle': 'Desenvolvimento full-stack, APIs e sistemas de automação para startups e empresas em crescimento.',
    'hero.description': 'Ajudando empresas a reduzir trabalho manual, melhorar eficiência e lançar produtos digitais mais rápido.',
    'hero.cta1': 'Agendar Conversa',
    'hero.cta2': 'Solicitar Orçamento',
    'hero.proof1': 'Projetos Entregues',
    'hero.proof2': 'Sistemas de Automação',
    
    // Problems
    'problems.title': 'Você precisa...',
    'problems.subtitle': 'Ajudo a resolver esses desafios comuns de negócios',
    'problems.1': 'Automatizar processos internos e reduzir trabalho manual?',
    'problems.2': 'Construir um dashboard personalizado ou ferramenta interna?',
    'problems.3': 'Criar um backend escalável ou API REST/GraphQL?',
    'problems.4': 'Lançar um MVP rapidamente para validar sua ideia?',
    'problems.5': 'Integrar sistemas (ERP, CRM, gateways de pagamento)?',
    'problems.6': 'Escalar a infraestrutura da sua aplicação existente?',
    
    // Services
    'services.title': 'Serviços',
    'services.subtitle': 'Serviços de desenvolvimento completos para ajudar seu negócio a crescer',
    'services.web.title': 'Desenvolvimento Web Personalizado',
    'services.web.desc': 'Aplicações full-stack, dashboards e portais construídos com frameworks modernos e melhores práticas.',
    'services.api.title': 'Desenvolvimento de APIs',
    'services.api.desc': 'APIs RESTful e GraphQL com arquitetura adequada, documentação e escalabilidade desde o início.',
    'services.automation.title': 'Automação & Integrações',
    'services.automation.desc': 'Workflows personalizados, bots e integrações de sistemas para reduzir trabalho manual e melhorar eficiência.',
    'services.mvp.title': 'Desenvolvimento de MVP',
    'services.mvp.desc': 'Desenvolvimento de produto rápido e focado para validar sua ideia de negócio e chegar ao mercado rapidamente.',
    
    // Why Work With Me
    'why.title': 'Por Que Trabalhar Comigo',
    'why.subtitle': 'Serviços de desenvolvimento profissionais em que você pode confiar',
    'why.architecture': 'Arquitetura Limpa',
    'why.architecture.desc': 'Código bem estruturado e mantível que resiste ao teste do tempo',
    'why.delivery': 'Entrega Rápida',
    'why.delivery.desc': 'Desenvolvimento ágil com marcos semanais e atualizações regulares',
    'why.communication': 'Comunicação Clara',
    'why.communication.desc': 'Check-ins regulares, rastreamento transparente de progresso e respostas rápidas',
    'why.documentation': 'Documentação Incluída',
    'why.documentation.desc': 'Documentação abrangente para fácil transferência e manutenção futura',
    'why.support': 'Suporte a Longo Prazo',
    'why.support.desc': 'Suporte e manutenção pós-lançamento para manter seu app funcionando perfeitamente',
    'why.quality': 'Qualidade Garantida',
    'why.quality.desc': 'Testes completos e revisões de código antes de cada implantação',
    
    // Process
    'process.title': 'Como Eu Trabalho',
    'process.subtitle': 'Um processo comprovado para entrega bem-sucedida de projetos',
    'process.discovery.title': 'Descoberta',
    'process.discovery.desc': 'Entendendo seus objetivos de negócio, desafios e requisitos técnicos',
    'process.discovery.duration': '1-2 dias',
    'process.planning.title': 'Planejamento',
    'process.planning.desc': 'Design de arquitetura, seleção de stack tecnológico e roadmap detalhado',
    'process.planning.duration': '3-5 dias',
    'process.development.title': 'Desenvolvimento',
    'process.development.desc': 'Desenvolvimento ágil com entregas semanais e atualizações regulares de progresso',
    'process.development.duration': '2-8 semanas',
    'process.launch.title': 'Lançamento',
    'process.launch.desc': 'Deploy, testes, documentação e transferência de conhecimento',
    'process.launch.duration': '3-5 dias',
    'process.iteration.title': 'Iteração',
    'process.iteration.desc': 'Melhorias contínuas, correção de bugs e novos recursos',
    'process.iteration.duration': 'Contínuo',
    
    // Tech Stack
    'tech.title': 'Stack Tecnológico',
    'tech.subtitle': 'Tecnologias modernas para aplicações robustas e escaláveis',
    'tech.more': '+ Muitas outras ferramentas e frameworks baseados nas necessidades do projeto',
    
    // Case Studies
    'cases.title': 'Casos de Estudo',
    'cases.subtitle': 'Projetos reais, resultados reais',
    'cases.button': 'Ver caso completo',
    'cases.problem': 'Problema',
    'cases.solution': 'Solução',
    'cases.results': 'Resultados',
    
    // Projects
    'projects.title': 'PROJETOS.',
    'projects.filters': 'FILTROS:',
    'projects.search': 'Buscar por nome, linguagem ou tecnologias...',
    'projects.notfound': 'Nenhum projeto encontrado com esses filtros.',
    
    // Final CTA
    'cta.title1': 'Vamos construir algo',
    'cta.title2': 'incrível juntos',
    'cta.subtitle': 'Pronto para começar seu projeto? Agende uma consulta gratuita ou solicite um orçamento detalhado.',
    'cta.button1': 'Agendar Conversa Grátis',
    'cta.button2': 'Solicitar Orçamento',
    'cta.availability': 'Disponível para novos projetos · Resposta em 24h',
    
    // Footer
    'footer.description': 'Desenvolvedor full-stack construindo aplicações web escaláveis e sistemas de automação.',
    'footer.links': 'Links Rápidos',
    'footer.home': 'Início',
    'footer.contact.title': 'Entre em Contato',
    'footer.send': 'Enviar Mensagem',
    'footer.rights': 'Todos os direitos reservados.',
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedLang) setLanguage(savedLang);
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    handleSetTheme(newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage: handleSetLanguage, theme, setTheme: handleSetTheme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}