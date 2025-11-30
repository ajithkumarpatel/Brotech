import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Layers, Cpu, Smartphone, Lock } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const technologies: TechItem[] = [
  { name: 'React', category: 'Frontend', description: 'A JavaScript library for building user interfaces with component-based architecture.', icon: Code, color: 'text-blue-400' },
  { name: 'TypeScript', category: 'Language', description: 'Typed JavaScript that scales. Adds robust type safety to our codebases.', icon: Code, color: 'text-blue-600' },
  { name: 'Tailwind CSS', category: 'Styling', description: 'A utility-first CSS framework for rapid UI development and custom designs.', icon: Layers, color: 'text-cyan-400' },
  { name: 'Firebase', category: 'Backend / DB', description: 'Google\'s platform for scalable databases, auth, and hosting.', icon: Database, color: 'text-orange-500' },
  { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine for fast, scalable network apps.', icon: Server, color: 'text-green-500' },
  { name: 'React Native', category: 'Mobile', description: 'Create native apps for Android and iOS using React.', icon: Smartphone, color: 'text-blue-400' },
  { name: 'Framer Motion', category: 'Animation', description: 'Production-ready motion library for React.', icon: Cpu, color: 'text-purple-500' },
  { name: 'Stripe', category: 'Payments', description: 'Financial infrastructure platform for the internet.', icon: Lock, color: 'text-indigo-500' },
];

const TechStackPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Technology Stack</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            We use the latest, most reliable tools to build fast, scalable, and secure applications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 ${tech.color}`}>
                <tech.icon size={32} />
              </div>
              
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">{tech.category}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{tech.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;