import React from 'react';
import { Link } from 'react-router-dom';
import { useCareers } from '../services/hooks';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CareersPage: React.FC = () => {
  const { data: jobs, loading } = useCareers();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-blue-600 dark:bg-blue-900 py-24 text-center text-white">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We are looking for talented individuals to help us build the next generation of web experiences.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Open Positions</h2>
          
          {loading ? (
             <div className="text-center py-10 dark:text-slate-400">Loading open roles...</div>
          ) : jobs.length === 0 ? (
             <div className="text-center py-10 text-slate-500 dark:text-slate-400">No open positions at the moment. Check back later!</div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, idx) => (
                <motion.div 
                  key={job.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.4 }}
                  className="group border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">{job.salary}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/careers/${job.id}`} 
                      className="inline-flex items-center justify-center px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Apply Now <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPage;