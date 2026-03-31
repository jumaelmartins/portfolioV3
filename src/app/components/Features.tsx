import { Monitor, Code, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function Features() {
  const features = [
    {
      icon: Monitor,
      title: 'Design Responsivo',
      description: 'Desenvolvo layouts que se adaptam a qualquer dispositivo, garantindo uma experiência consistente em desktops, tablets e smartphones.',
      color: 'blue'
    },
    {
      icon: Code,
      title: 'Código Limpo',
      description: 'Escrevo código seguindo as melhores práticas, com foco em manutenibilidade, performance e escalabilidade. CSS, ReactJS e Vite.js com Javascript registrado lisos sempre.',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Aprendizado Contínuo',
      description: 'Mantenho-me atualizado com as últimas tecnologias e tendências do mercado através de cursos, documentações e projetos práticos, buscando sempre aprimoramento e etc.',
      color: 'blue'
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute top-0 left-8 w-12 h-1 bg-${feature.color}-600`}></div>
              <motion.div 
                className="mb-6 text-blue-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon size={48} strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}