import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';
import { motion } from 'framer-motion';

const TestimonialCard: React.FC<{ testimonial: Testimonial; index?: number }> = ({ testimonial, index = 0 }) => {
  const rating = testimonial.rating || 5;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm relative hover:shadow-md transition-shadow"
    >
      <Quote className="absolute top-6 right-6 text-blue-100 dark:text-blue-900/30 h-12 w-12" />
      
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-slate-600'}`} 
          />
        ))}
      </div>

      <p className="text-slate-600 dark:text-slate-300 italic mb-6 relative z-10">"{testimonial.content}"</p>
      
      <div className="flex items-center gap-4">
        {testimonial.image ? (
          <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-50 dark:ring-blue-900" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{testimonial.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;