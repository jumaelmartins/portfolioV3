import { Calendar, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useMemo } from 'react';

/* ─── Starry night background ──────────────────────────────────────── */
function StarField() {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        maxOpacity: 0.15 + Math.random() * 0.45,
      });
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, star.maxOpacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function FinalCTA() {
  const { t } = useApp();

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="py-24 px-6 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0c0f1a 0%, #131e3a 100%)' }}
    >
      {/* Starry sky */}
      <StarField />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {t('cta.title1')}
            <br />
            <span className="text-blue-400">{t('cta.title2')}</span>
          </h2>

          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.button
              onClick={scrollToContact}
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 font-semibold text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Calendar size={20} />
              {t('cta.button1')}
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 px-8 py-4 rounded-full transition-all flex items-center gap-2 font-semibold text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Mail size={20} />
              {t('cta.button2')}
            </motion.button>
          </div>

          <motion.div
            className="inline-flex items-center gap-2 text-white/35 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>{t('cta.availability')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}