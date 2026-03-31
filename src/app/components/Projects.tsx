import { useState, useMemo, useRef } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useApp } from '../context/AppContext';

/* ─── Project data ──────────────────────────────────────────────────── */
const allProjects = [
  {
    id: 1,
    title: 'E-Commerce React',
    description: 'Plataforma de e-commerce responsiva com carrinho dinâmico, checkout e painel de administração.',
    emoji: '🛍️',
    accent: '#f59e0b',
    tech: ['React', 'TypeScript', 'CSS'],
    category: 'FRONTEND',
    url: 'https://example.com',
    github: 'https://github.com/example/project1',
    year: '2024',
  },
  {
    id: 2,
    title: 'Landing Page',
    description: 'Landing page de alta conversão com animações parallax, formulários e integração de analytics.',
    emoji: '🎨',
    accent: '#10b981',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'FRONTEND',
    url: 'https://example.com',
    github: 'https://github.com/example/project2',
    year: '2024',
  },
  {
    id: 3,
    title: 'API REST',
    description: 'API robusta com autenticação JWT, rate limiting, documentação Swagger e testes automatizados.',
    emoji: '⚙️',
    accent: '#6366f1',
    tech: ['Node', 'Express', 'MongoDB'],
    category: 'BACKEND',
    url: 'https://example.com',
    github: 'https://github.com/example/project3',
    year: '2023',
  },
  {
    id: 4,
    title: 'App Full-Stack',
    description: 'Aplicação completa com SSR, autenticação de usuários, banco de dados relacional e deploy CI/CD.',
    emoji: '🚀',
    accent: '#ec4899',
    tech: ['React', 'Node', 'PostgreSQL'],
    category: 'FULLSTACK',
    url: 'https://example.com',
    github: 'https://github.com/example/project4',
    year: '2023',
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo com gráficos em tempo real, exportação de relatórios e filtros avançados.',
    emoji: '📊',
    accent: '#14b8a6',
    tech: ['JavaScript', 'Chart.js', 'CSS'],
    category: 'FRONTEND',
    url: 'https://example.com',
    github: 'https://github.com/example/project5',
    year: '2024',
  },
  {
    id: 6,
    title: 'Sistema CRM',
    description: 'CRM customizado com pipeline de vendas, automação de e-mails, integrações e relatórios gerenciais.',
    emoji: '💼',
    accent: '#f97316',
    tech: ['TypeScript', 'React', 'Node'],
    category: 'FULLSTACK',
    url: 'https://example.com',
    github: 'https://github.com/example/project6',
    year: '2023',
  },
];

const FILTER_GROUPS = [
  { label: 'TODOS', key: 'TODOS' },
  { label: 'FRONTEND', key: 'FRONTEND' },
  { label: 'BACKEND', key: 'BACKEND' },
  { label: 'FULLSTACK', key: 'FULLSTACK' },
  { label: 'HTML', key: 'HTML' },
  { label: 'CSS', key: 'CSS' },
  { label: 'JS', key: 'JAVASCRIPT' },
  { label: 'TS', key: 'TYPESCRIPT' },
  { label: 'REACT', key: 'REACT' },
  { label: 'NODE', key: 'NODE' },
];

/* ─── 3D Tilt Project Card ──────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
    >
      {/* Card */}
      <div
        className="relative h-full rounded-2xl overflow-hidden border transition-all duration-300"
        style={{
          background: 'var(--ds-surface-alt)',
          borderColor: 'var(--ds-border)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}50`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${project.accent}15`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--ds-border)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Header — emoji + blurred accent blob */}
        <div
          className="relative h-40 flex items-center justify-center overflow-hidden"
          style={{ background: `${project.accent}12` }}
        >
          {/* Blurred blob */}
          <div
            className="absolute inset-0 opacity-30 blur-3xl scale-150"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(${project.accent}88 1px, transparent 1px), linear-gradient(90deg, ${project.accent}88 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          {/* Emoji */}
          <motion.div
            className="relative z-10 text-6xl select-none"
            whileHover={{ scale: 1.15 }}
          >
            {project.emoji}
          </motion.div>
          {/* Year */}
          <div
            className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: project.accent, borderColor: `${project.accent}50`, background: `${project.accent}12` }}
          >
            {project.year}
          </div>
          {/* Category */}
          <div
            className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-sm font-bold"
            style={{ background: project.accent, color: '#000' }}
          >
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-[#6b7fa3] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-2 py-0.5 rounded border text-gray-500 dark:text-[#6b7fa3]"
                style={{ borderColor: 'var(--ds-border)', background: 'var(--ds-surface)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'var(--ds-border)' }} />

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border text-gray-500 dark:text-[#6b7fa3] transition-all"
              style={{ borderColor: 'var(--ds-border)', background: 'var(--ds-surface)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Github size={13} />
              Code
            </motion.a>
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all"
              style={{ background: project.accent, color: '#000' }}
              whileHover={{ scale: 1.07, opacity: 0.9 }}
              whileTap={{ scale: 0.96 }}
            >
              <ExternalLink size={13} />
              Live
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */
export function Projects() {
  const { t } = useApp();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['TODOS']);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesFilter =
        selectedFilters.includes('TODOS') ||
        selectedFilters.includes(project.category) ||
        project.tech.some((tech) => selectedFilters.includes(tech.toUpperCase()));

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tech.some((tech) => tech.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilters, searchQuery]);

  const toggleFilter = (key: string) => {
    if (key === 'TODOS') {
      setSelectedFilters(['TODOS']);
    } else {
      const without = selectedFilters.filter((f) => f !== 'TODOS');
      if (without.includes(key)) {
        const next = without.filter((f) => f !== key);
        setSelectedFilters(next.length === 0 ? ['TODOS'] : next);
      } else {
        setSelectedFilters([...without, key]);
      }
    }
  };

  const clearFilters = () => {
    setSelectedFilters(['TODOS']);
    setSearchQuery('');
  };

  const hasActiveFilters = !selectedFilters.includes('TODOS') || searchQuery !== '';

  return (
    <section
      id="projetos"
      className="py-24 px-6 overflow-hidden relative transition-colors"
      style={{ background: 'var(--ds-bg)' }}
    >
      {/* Ambient blobs — subtle in both modes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/[0.04] dark:bg-blue-500/[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/[0.04] dark:bg-blue-600/[0.06] rounded-full blur-[100px]" />
      </div>

      <div className="relative container mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('projects.title')}
          </h2>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search */}
          <div className="relative mb-4">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#6b7fa3]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('projects.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-[#4a5a78] focus:outline-none transition-all duration-200"
              style={{
                background: 'var(--ds-surface)',
                border: '1px solid var(--ds-border)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.06)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--ds-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.18em] text-gray-400 dark:text-[#4a5a78] uppercase mr-1">
              {t('projects.filters')}
            </span>

            {FILTER_GROUPS.map(({ label, key }) => {
              const active = selectedFilters.includes(key);
              return (
                <motion.button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-150"
                  style={
                    active
                      ? {
                          background: 'var(--ds-accent)',
                          color: '#fff',
                          borderColor: 'transparent',
                          boxShadow: '0 0 12px rgba(37,99,235,0.30)',
                          fontWeight: 700,
                        }
                      : {
                          background: 'var(--ds-surface)',
                          color: 'var(--ds-muted)',
                          borderColor: 'var(--ds-border)',
                        }
                  }
                >
                  {label}
                </motion.button>
              );
            })}

            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearFilters}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 border transition-colors"
                  style={{
                    color: 'var(--ds-muted)',
                    borderColor: 'var(--ds-border)',
                    background: 'var(--ds-surface)',
                  }}
                >
                  <X size={11} />
                  limpar
                </motion.button>
              )}
            </AnimatePresence>

            <span className="ml-auto font-mono text-xs text-gray-400 dark:text-[#4a5a78]">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
            </span>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[420px]"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <motion.div
                key="empty"
                className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-5xl mb-4 opacity-30">🔍</div>
                <p className="text-sm text-gray-400 dark:text-[#4a5a78]">{t('projects.notfound')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}