import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export function CaseStudies() {
  const { t } = useApp();

  const casesItems = t('cases.items') || [];
  const icons = [TrendingUp, Clock, Users];

  const cases = casesItems.map((item: any) => ({
    ...item,
    results: item.results.map((text: string, i: number) => ({
      icon: icons[i % icons.length],
      text
    }))
  }));

  return (
    <section
      id="cases"
      className="py-20 px-6 overflow-hidden transition-colors"
      style={{ background: 'var(--ds-surface)' }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('cases.title')}
          </h2>
          <p className="text-xl text-gray-500 dark:text-[#6b7fa3] max-w-2xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 md:p-10 border transition-all duration-300 hover:shadow-md"
              style={{
                background: 'var(--ds-surface-alt)',
                borderColor: 'var(--ds-border)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ borderColor: 'rgba(37,99,235,0.25)' }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {caseItem.client}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {caseItem.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-[#4a5a78] uppercase tracking-widest mb-3">
                    {t('cases.problem')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{caseItem.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-[#4a5a78] uppercase tracking-widest mb-3">
                    {t('cases.solution')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{caseItem.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-400 dark:text-[#4a5a78] uppercase tracking-widest mb-4">
                  {t('cases.results')}
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {caseItem.results.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-xl border"
                      style={{ background: 'var(--ds-accent-subtle)', borderColor: 'rgba(37,99,235,0.12)' }}
                    >
                      <result.icon className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {caseItem.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300"
                    style={{ background: 'var(--ds-accent-subtle)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.button
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group"
                whileHover={{ x: 5 }}
              >
                {t('cases.button')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}