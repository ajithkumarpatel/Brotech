
import React from 'react';
import { useTestimonials } from '../services/hooks';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const WallOfLovePage: React.FC = () => {
  const { data: testimonials, loading } = useTestimonials();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Reviews...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <Quote size={400} className="absolute -top-20 -left-20 transform rotate-12" />
            <Quote size={400} className="absolute bottom-0 right-0 transform -rotate-12" />
        </div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative z-10"
        >
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">Wall of Love</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Trusted by Innovative Companies</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            See what our partners have to say about working with Brotech WebSolutions.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((t, idx) => {
            const rating = t.rating || 5;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="break-inside-avoid bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-xl">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-slate-600'}`} 
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 text-blue-200 dark:text-blue-900/30 w-8 h-8 transform -scale-x-100" />
                  <p className="text-slate-700 dark:text-slate-300 italic relative z-10 pl-4 leading-relaxed">
                    "{t.content}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WallOfLovePage;