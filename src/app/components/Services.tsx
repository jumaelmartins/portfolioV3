import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import React from 'react';

const AnimatedCodeIcon = () => (
  <div className="relative w-7 h-7">
    <motion.div className="absolute left-0" animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
      <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
        <path d="M10 4L2 14L10 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
    <motion.div className="absolute right-0" animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
      <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
        <path d="M4 4L12 14L4 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  </div>
);

const AnimatedServerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
    <motion.circle cx="6" cy="6" r="1" fill="currentColor" animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }} />
  </svg>
);

const AnimatedWorkflowIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="6" height="6" rx="1" />
    <rect x="16" y="6" width="6" height="6" rx="1" />
    <rect x="9" y="12" width="6" height="6" rx="1" />
    <motion.path d="M8 9h3" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }} />
    <motion.path d="M13 9h3" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }} />
    <motion.path d="M12 12v-3" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }} />
  </svg>
);

const AnimatedRocketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <motion.path d="M3 19l2-2" strokeWidth="2.5" animate={{ opacity: [0.4, 1, 0.4], pathLength: [0.3, 1, 0.3], y: [0, -1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
    <motion.path d="M5 21l2-2" strokeWidth="2.5" animate={{ opacity: [0.3, 0.9, 0.3], pathLength: [0.4, 1, 0.4], y: [0, -1.5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} />
  </svg>
);

export function Services() {
  const { t } = useApp();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const services = [
    { icon: AnimatedCodeIcon, key: 'web', tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { icon: AnimatedServerIcon, key: 'api', tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
    { icon: AnimatedWorkflowIcon, key: 'automation', tech: ['Zapier', 'Make', 'Custom APIs', 'Webhooks'] },
    { icon: AnimatedRocketIcon, key: 'mvp', tech: ['Agile', 'Rapid Prototyping', 'User Testing'] },
  ];

  return (
    <section
      id="servicos"
      className="py-20 px-6 overflow-hidden transition-colors"
      style={{ background: 'var(--ds-surface-alt)' }}
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
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-500 dark:text-[#6b7fa3] max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 border cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--ds-surface)',
                borderColor: 'var(--ds-border)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                filter: hoveredIndex !== null && hoveredIndex !== index ? 'blur(2px)' : 'blur(0px)',
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.55 : 1,
                scale: hoveredIndex === index ? 1.02 : 1,
                boxShadow: hoveredIndex === index
                  ? '0 8px 30px rgba(37,99,235,0.10)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400"
                  style={{ background: 'var(--ds-accent-subtle)' }}
                >
                  <service.icon />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-gray-500 dark:text-[#6b7fa3] leading-relaxed mb-5">
                  {t(`services.${service.key}.desc`)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400"
                    style={{
                      background: 'var(--ds-surface-alt)',
                      border: '1px solid var(--ds-border)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}