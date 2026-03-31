import { Shield, Zap, MessageSquare, FileText, HeadphonesIcon, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, MouseEvent } from 'react';
import { useApp } from '../context/AppContext';

export function WhyWorkWithMe() {
  const { t } = useApp();

  const benefits = [
    { icon: Shield, key: 'architecture' },
    { icon: Zap, key: 'delivery' },
    { icon: MessageSquare, key: 'communication' },
    { icon: FileText, key: 'documentation' },
    { icon: HeadphonesIcon, key: 'support' },
    { icon: Award, key: 'quality' },
  ];

  return (
    <section className="py-20 px-6 bg-blue-600 dark:bg-blue-700 overflow-hidden transition-colors">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('why.title')}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit, index, t }: { benefit: { icon: React.ElementType; key: string }; index: number; t: (key: string) => string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.35)' }}
    >
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.12), transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
          <benefit.icon size={22} className="text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{t(`why.${benefit.key}`)}</h3>
        <p className="text-blue-100 leading-relaxed text-sm">{t(`why.${benefit.key}.desc`)}</p>
      </div>
    </motion.div>
  );
}