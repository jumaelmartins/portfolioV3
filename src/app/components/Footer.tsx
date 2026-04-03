import { useState } from 'react';
import { Linkedin, Mail, Phone, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactForm } from './ContactForm';
import { useApp } from '../context/AppContext';

export function Footer() {
  const { t } = useApp();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="contato"
        className="py-16 px-6 overflow-hidden transition-colors text-white"
        style={{ background: '#101829', borderTop: '1px solid rgba(139,165,255,0.10)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-mono text-2xl mb-4 font-bold text-white">
                {'<'}/<span className="text-blue-400">JM</span>{'>'}
              </div>
              <p className="text-white/50 mb-5 text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex gap-2">
                {[
                  { href: 'https://github.com/jumael-martins', Icon: Github },
                  { href: 'https://linkedin.com/in/jumael-martins', Icon: Linkedin },
                ].map(({ href, Icon }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 border border-white/10 transition-all hover:text-blue-400 hover:border-blue-400/30"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(37,99,235,0.3)' }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-bold text-base mb-5 text-white">{t('footer.links')}</h3>
              <div className="space-y-2.5">
                {[
                  { label: t('footer.home'), action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                  { label: t('nav.services'), action: () => scrollTo('servicos') },
                  { label: t('nav.cases'), action: () => scrollTo('cases') },
                  { label: t('nav.projects'), action: () => scrollTo('projetos') },
                ].map(({ label, action }) => (
                  <motion.button
                    key={label}
                    onClick={action}
                    className="block text-sm text-white/40 hover:text-blue-400 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-bold text-base mb-5 text-white">{t('footer.contact.title')}</h3>
              <div className="space-y-3 mb-6">
                <motion.button
                  onClick={() => setIsContactFormOpen(true)}
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-blue-400 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Mail size={16} />
                  <span>jumael.martins@email.com</span>
                </motion.button>

                <motion.a
                  href="tel:+557199604206"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-blue-400 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Phone size={16} />
                  <span>+55 (71) 996 040 206</span>
                </motion.a>
              </div>

              <motion.button
                onClick={() => setIsContactFormOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors text-sm font-semibold shadow-sm hover:shadow-blue-500/20 hover:shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('footer.send')}
              </motion.button>
            </motion.div>
          </div>

          <div
            className="text-center text-sm text-white/25 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            © 2025 Jumael Martins. {t('footer.rights')}
          </div>
        </div>
      </footer>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </>
  );
}