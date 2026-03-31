import { Plus, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const skills = [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: 'JS' },
    { name: 'Python', icon: '🐍' },
    { name: 'GitHub', icon: '📦' },
  ];

  const frameworks = [
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js', icon: '⬢' },
    { name: 'React', icon: '⚛️' },
  ];

  const experience = [
    {
      role: 'DESENVOLVEDOR FULL-STACK',
      company: 'IRE (4 meses)',
      period: '04/2023 – PRESENTE',
      description: ''
    },
    {
      role: 'DESENVOLVEDOR PYTHON',
      company: 'FREELANCER',
      period: '12/2022 – (3 meses)',
      description: ''
    },
    {
      role: 'DESENVOLVEDOR JUNIOR',
      company: 'ITSOLVERS',
      period: '05/2022 – 05/2023',
      description: ''
    },
    {
      role: 'ESTAGIÁRIO ADMINISTRATIVO',
      company: 'AGREGAR',
      period: '01/2021 – 02/2022',
      description: ''
    }
  ];

  const education = [
    {
      degree: 'Bacharelado em Ciências da Computação',
      institution: 'UNDB',
      period: '(2022 – 2025)'
    },
    {
      degree: 'Tecnólogo em Redes de Computadores',
      institution: 'IFMA',
      period: '(2019 – 2023)'
    }
  ];

  return (
    <section id="sobre" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Plus className="text-blue-600" size={40} strokeWidth={3} />
            </motion.div>
          </div>
          <h2 className="text-4xl font-bold mb-4">SOBRE.</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Maecenas rhoncus lorem sed metus volutpat tempor. 
            Suspendisse potenti. Quisquam erat mollis augue luctus tristique ullamcorper. Quisquam erat mollis dapibus 
            nunc egestas finibus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Skills */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">HABILIDADES.</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Já utilizei com maestria</p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Aprendendo</p>
                <div className="flex flex-wrap gap-3">
                  {frameworks.map((framework, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span>{framework.icon}</span>
                      <span>{framework.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">EXPERIÊNCIA PROFISSIONAL.</h3>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Briefcase size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{exp.role}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-bold text-lg mb-4">FORMAÇÃO ACADÊMICA.</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <GraduationCap size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.institution} {edu.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div 
            className="flex flex-col justify-center items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-xs relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <Plus size={24} />
              </div>
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-gray-600">Projetos</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-xs"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-gray-600">Projetos</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-xs"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-gray-600">Projetos</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}