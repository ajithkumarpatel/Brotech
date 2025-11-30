

import React from 'react';
import { useTeam, useSiteContent } from '../services/hooks';
import { motion } from 'framer-motion';
import GlobalMap from '../components/GlobalMap';

const AboutPage: React.FC = () => {
  const { data: team, loading } = useTeam();
  const { content } = useSiteContent();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {content?.aboutTitle || "We Are Brotech"}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            {content?.aboutSubtitle || "A passionate team of developers, designers, and strategists dedicated to building the future of the web."}
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {content?.aboutStory || "Founded in 2018, Brotech WebSolutions started with a simple mission: to make high-quality web technology accessible to businesses of all sizes. What began as a small freelance operation has grown into a full-service agency with clients across the globe."}
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {content?.aboutMission || "We believe in transparency, speed, and code quality. We don't just build websites; we build digital infrastructures that scale with your business."}
          </p>
        </div>
      </div>
      
      {/* Global Reach Section */}
      <div className="bg-white dark:bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
               {content?.globalReachTitle || "Global Reach"}
             </h2>
             <p className="text-slate-500 dark:text-slate-400">
               {content?.globalReachDescription || "Serving clients remotely from Silicon Valley to Singapore."}
             </p>
           </div>
           <GlobalMap />
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-slate-950 py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Meet the Team</h2>
          
          {loading ? (
            <div className="text-center text-slate-500">Loading team...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-200 dark:bg-slate-800">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;