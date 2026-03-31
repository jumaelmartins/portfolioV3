import { useState, useEffect } from 'react';
import { Github, Linkedin, Moon, Sun, Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export function Header() {
  const { language, setLanguage, theme, toggleTheme, t } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['inicio', 'servicos', 'cases', 'projetos', 'contato'];
      const scrollPosition = window.scrollY + 100;

      // Walk backwards so the last matching section wins (most specific)
      let found = 'inicio';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            found = section;
          }
        }
      }

      // Se o usuário rolou até o final absoluto da página, força a ativação do contato
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        found = 'contato';
      }

      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const navLinks = [
    { key: 'servicos', label: t('nav.services') },
    { key: 'cases', label: t('nav.cases') },
    { key: 'projetos', label: t('nav.projects') },
  ];

  const isContactActive = activeSection === 'contato';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: theme === 'dark'
          ? (scrolled ? 'rgba(12,15,26,0.92)' : 'rgba(12,15,26,0.70)')
          : (scrolled ? 'rgba(248,249,252,0.92)' : 'rgba(248,249,252,0.70)'),
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--ds-border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(15,23,42,0.06)' : 'none',
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-mono text-xl cursor-pointer font-bold text-gray-900 dark:text-white tracking-tight"
            onClick={() => scrollToSection('inicio')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {'<'}/<span className="text-blue-600 dark:text-blue-400">JM</span>{'>'}
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === key
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ y: -2 }}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('contato')}
              className={`px-5 py-2 rounded-full transition-all text-sm font-semibold ${
                isContactActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/40'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-blue-500/20 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {t('nav.contact')}
            </motion.button>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <motion.button
              onClick={toggleLanguage}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
            >
              <Languages size={17} />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} className="text-yellow-400" />}
            </motion.button>

            <motion.a
              href="https://github.com/jumael-martins"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={17} />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/jumael-martins"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={17} />
            </motion.a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 border-t"
              style={{ borderColor: 'var(--ds-border)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="text-sm font-semibold text-left py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contato')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold text-center"
                >
                  {t('nav.contact')}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}