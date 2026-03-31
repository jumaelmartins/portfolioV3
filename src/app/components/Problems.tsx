import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export function Problems() {
  const { t } = useApp();
  const problems = ['1', '2', '3', '4', '5', '6'];

  const AnimatedDots = () => (
    <span className="inline-block ml-1">
      {[
        { times: [0, 0.15, 0.85, 0.95, 1] },
        { times: [0, 0.15, 0.35, 0.95, 1] },
        { times: [0, 0.35, 0.55, 0.95, 1] },
      ].map((dot, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, times: dot.times }}
        >
          .
        </motion.span>
      ))}
    </span>
  );

  return (
    <section
      className="py-20 px-6 overflow-hidden transition-colors"
      style={{ background: 'var(--ds-surface)' }}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('problems.title').replace('...', '')}<AnimatedDots />
          </h2>
          <p className="text-xl text-gray-500 dark:text-[#6b7fa3]">
            {t('problems.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3">
          {problems.map((num, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-black/[0.07] dark:hover:border-white/[0.07] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <CheckCircle2 className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" size={22} />
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(`problems.${num}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}