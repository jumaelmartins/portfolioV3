import { useState, useEffect } from 'react';
import { Home, Code, Briefcase, FolderOpen, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicos', 'cases', 'projetos', 'contato'];
      const scrollPosition = window.scrollY + 200;

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
    if (element) {
      // Adiciona offset de 80px para seção de contato para não ir muito pro rodapé
      const offset = id === 'contato' ? -80 : 0;
      const offsetTop = element.offsetTop + offset;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'inicio', icon: Home, label: 'Home' },
    { id: 'servicos', icon: Code, label: 'Services' },
    { id: 'cases', icon: Briefcase, label: 'Cases' },
    { id: 'projetos', icon: FolderOpen, label: 'Projects' },
    { id: 'contato', icon: Mail, label: 'Contact' }
  ];

  return (
    <motion.div 
      className="fixed right-6 bottom-6 flex flex-col gap-3 z-40"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg group relative ${
            activeSection === item.id
              ? 'bg-blue-600 text-white scale-110'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <item.icon size={20} />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}