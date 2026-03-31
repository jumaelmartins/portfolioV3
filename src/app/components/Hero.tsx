import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import profileImg from '../../assets/5e190d05381ea69c600d531b493ff0584c16b45c.png';
import { useApp } from '../context/AppContext';

export function Hero() {
  const { t } = useApp();

  const handleContact = () => {
    const element = document.getElementById('contato');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden transition-colors"
      style={{ background: 'var(--ds-bg)' }}
    >
      {/* Subtle background mesh */}
      <div className="pointer-events-none h-full absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[100px] bg-blue-500" />
        <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px] bg-blue-600" />

        {/* Subtle animated wave at bottom */}
        <svg
          className="absolute left-0 w-full h-full md:hfull"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0,80 C240,40 480,100 720,70 C960,40 1200,90 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            // fill="#333"
            className="text-blue-400/[0.04] dark:text-blue-400/[0.06]"
            animate={{
              d: [
                "M0,80 C240,40 480,100 720,70 C960,40 1200,90 1440,60 L1440,120 L0,120 Z",
                "M0,60 C240,90 480,50 720,85 C960,55 1200,40 1440,75 L1440,120 L0,120 Z",
                "M0,80 C240,40 480,100 720,70 C960,40 1200,90 1440,60 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,90 C300,60 600,110 900,75 C1100,55 1300,95 1440,70 L1440,120 L0,120 Z"
            fill="currentColor"
            className="text-blue-500/[0.03] dark:text-blue-500/[0.04]"
            animate={{
              d: [
                "M0,90 C300,60 600,110 900,75 C1100,55 1300,95 1440,70 L1440,120 L0,120 Z",
                "M0,70 C300,100 600,55 900,90 C1100,65 1300,50 1440,85 L1440,120 L0,120 Z",
                "M0,90 C300,60 600,110 900,75 C1100,55 1300,95 1440,70 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Available badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
              style={{
                background: 'var(--ds-accent-subtle)',
                borderColor: 'rgba(37,99,235,0.18)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {t('hero.available')}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.08] tracking-tight text-gray-900 dark:text-white font-bold">
              {t('hero.title1')}{' '}
              <span className="text-blue-600 dark:text-blue-400">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </h1>

            <p className="text-xl text-gray-500 dark:text-[#6b7fa3] mb-4 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <p className="text-lg text-gray-400 dark:text-[#4a5a78] mb-10">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <motion.button
                onClick={handleContact}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 font-semibold text-sm"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Calendar size={18} />
                {t('hero.cta1')}
              </motion.button>

              <motion.button
                onClick={handleContact}
                className="bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-black/[0.10] dark:border-white/[0.10] px-8 py-4 rounded-full hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-sm"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                {t('hero.cta2')}
              </motion.button>
            </div>

            {/* Social proof */}
            <motion.div
              className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-[#6b7fa3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--ds-accent-subtle)' }}>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">20+</span>
                </div>
                <span>{t('hero.proof1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-xs">5+</span>
                </div>
                <span>{t('hero.proof2')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — profile image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-2xl opacity-15 dark:opacity-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white dark:border-[#131726] shadow-2xl shadow-blue-500/10">
                <img
                  src={profileImg}
                  alt="Jumael Martins"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}