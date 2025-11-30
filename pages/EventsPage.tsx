
import React from 'react';
import { useEvents } from '../services/hooks';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const { data: events, loading } = useEvents();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Events...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-indigo-900 py-24 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Webinars & Events</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Join our expert-led sessions to level up your digital strategy.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col"
            >
              <div className="h-48 bg-gray-200 dark:bg-slate-700 relative">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-4 left-4 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 shadow-sm">
                   {event.type}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 mb-4">
                   <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-500" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={16} className="text-indigo-500" />
                      <span>{event.time}</span>
                   </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{event.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-600">
                            <Users size={12} />
                         </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                         +50
                      </div>
                   </div>
                   <Link 
                     to="/contact" 
                     className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                   >
                     Register Free <ArrowRight size={16} />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {events.length === 0 && (
           <div className="text-center py-20 text-slate-500">No upcoming events. Check back later!</div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
