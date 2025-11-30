
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layout, Database, Zap, Terminal, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { motion } from 'framer-motion';

const iconMap = {
  code: Code,
  layout: Layout,
  database: Database,
  zap: Zap,
};

const ServiceCard: React.FC<{ service: Service; index?: number }> = ({ service, index = 0 }) => {
  const IconComponent = iconMap[service.icon] || Terminal;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
        <IconComponent size={28} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3 flex-grow">{service.description}</p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-500">Starts at</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.priceStart}</span>
        </div>
        <Link 
            to={`/services/${service.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
            Learn More <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
