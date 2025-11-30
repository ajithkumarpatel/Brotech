
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Home, ShoppingBag, Briefcase, GraduationCap, Truck, Utensils, Globe, ArrowRight } from 'lucide-react';
import { useIndustries } from '../services/hooks';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  activity: Activity,
  home: Home,
  'shopping-bag': ShoppingBag,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  truck: Truck,
  utensils: Utensils,
  globe: Globe
};

const IndustriesPage: React.FC = () => {
  const { data: industries, loading } = useIndustries();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Industries...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Industries We Serve</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              We understand the unique challenges of your sector. Our tailored solutions help you stand out.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, idx) => {
            const Icon = iconMap[industry.icon] || Globe;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{industry.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 min-h-[80px]">
                  {industry.description}
                </p>
                <Link to="/contact" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View Case Studies <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {industries.length === 0 && (
           <div className="text-center py-20 text-slate-400">No industries found.</div>
        )}

        <div className="mt-20 bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Don't see your industry?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                We have worked with diverse clients across 20+ sectors. Our technology stack is adaptable to any business need.
              </p>
              <Link to="/contact" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Let's Discuss Your Needs
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesPage;
