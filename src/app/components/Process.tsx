import { Search, Lightbulb, Code2, Rocket, RefreshCw } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

export function Process() {
  const { t } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  const steps = [
    { icon: Search, key: 'discovery', animation: { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity, repeatDelay: 1 } } },
    { icon: Lightbulb, key: 'planning', animation: { opacity: [0.5, 1, 0.5, 1], scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity, repeatDelay: 1 } } },
    { icon: Code2, key: 'development', animation: { scaleX: [1, 0.8, 1.2, 1], scaleY: [1, 1.2, 0.8, 1], transition: { duration: 2, repeat: Infinity, repeatDelay: 1 } } },
    { icon: Rocket, key: 'launch', animation: { y: [0, -20, 0], rotate: [0, -15, 0], transition: { duration: 2, repeat: Infinity, repeatDelay: 1 } } },
    { icon: RefreshCw, key: 'iteration', animation: { rotate: [0, 360], transition: { duration: 3, repeat: Infinity, ease: 'linear' } } },
  ];

  return (
    <section
      ref={containerRef}
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
            {t('process.title')}
          </h2>
          <p className="text-xl text-gray-500 dark:text-[#6b7fa3] max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ background: 'var(--ds-accent)' }} />
            <motion.div
              className="absolute inset-0"
              style={{
                height: lineHeight,
                transformOrigin: 'top',
                background: 'var(--ds-accent)',
                opacity: 0.5,
              }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, t }: { step: { icon: React.ElementType; key: string; animation: object }; index: number; t: (key: string) => string }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="flex-1">
        <motion.div
          className="rounded-2xl p-6 border transition-all duration-300"
          style={{
            background: 'var(--ds-surface)',
            borderColor: 'var(--ds-border)',
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 8px 30px rgba(37,99,235,0.08)',
            borderColor: 'rgba(37,99,235,0.2)',
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden text-blue-600 dark:text-blue-400"
              style={{ background: 'var(--ds-accent-subtle)' }}
            >
              <motion.div animate={step.animation}>
                <step.icon size={22} />
              </motion.div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {t(`process.${step.key}.title`)}
          </h3>
          <p className="text-gray-500 dark:text-[#6b7fa3] mb-4 leading-relaxed text-sm">
            {t(`process.${step.key}.desc`)}
          </p>
          <div className="flex justify-end">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400"
              style={{ background: 'var(--ds-accent-subtle)' }}
            >
              {t(`process.${step.key}.duration`)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="hidden md:block relative z-10">
        <motion.div
          className="w-4 h-4 rounded-full border-4 border-[#eef1f8] dark:border-[#1a1f32] shadow-lg"
          style={{ background: 'var(--ds-accent)' }}
          animate={isHovered ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
        >
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: 'var(--ds-accent)' }}
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}