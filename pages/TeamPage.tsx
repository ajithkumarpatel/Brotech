
import React from 'react';
import { useTeam } from '../services/hooks';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const TeamPage: React.FC = () => {
  const { data: team, loading } = useTeam();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Team</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Meet the passionate individuals behind Brotech WebSolutions who make digital magic happen.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center text-slate-500">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 dark:border-slate-700"
              >
                <div className="aspect-[4/5] bg-gray-200 dark:bg-slate-800 relative group">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    loading="lazy" 
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-2 bg-white rounded-full text-blue-900 hover:bg-blue-50 transition-colors"><Linkedin size={20} /></button>
                    <button className="p-2 bg-white rounded-full text-blue-900 hover:bg-blue-50 transition-colors"><Twitter size={20} /></button>
                    <button className="p-2 bg-white rounded-full text-blue-900 hover:bg-blue-50 transition-colors"><Mail size={20} /></button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wide mb-4">{member.role}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
