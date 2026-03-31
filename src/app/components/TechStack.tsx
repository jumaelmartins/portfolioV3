import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function TechStack() {
  const { t } = useApp();

  const technologies = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Nginx'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'Postman', 'Figma', 'Linear'] },
  ];

  return (
    <section
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
            {t('tech.title')}
          </h2>
          <p className="text-xl text-gray-500 dark:text-[#6b7fa3] max-w-2xl mx-auto">
            {t('tech.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 dark:text-[#4a5a78] text-sm">{t('tech.more')}</p>
        </motion.div>
      </div>
    </section>
  );
}

function TechCard({ tech, index }: { tech: { category: string; items: string[] }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl p-6 border transition-all duration-300"
      style={{
        background: 'var(--ds-surface-alt)',
        borderColor: isHovered ? 'rgba(37,99,235,0.25)' : 'var(--ds-border)',
        boxShadow: isHovered ? '0 8px 30px rgba(37,99,235,0.08)' : 'none',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle top accent line on hover */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: 'var(--ds-accent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative z-10">
        <h3 className="text-base font-bold mb-4 text-blue-600 dark:text-blue-400 font-mono uppercase tracking-wide">
          {tech.category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tech.items.map((item: string, i: number) => (
            <motion.span
              key={i}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border transition-colors cursor-default"
              style={{
                background: 'var(--ds-surface)',
                borderColor: 'var(--ds-border)',
              }}
              whileHover={{
                scale: 1.05,
                color: 'var(--ds-accent)',
                borderColor: 'rgba(37,99,235,0.3)',
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}