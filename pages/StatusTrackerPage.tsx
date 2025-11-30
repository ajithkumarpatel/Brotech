
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { getProjectStatus } from '../services/hooks';
import { ActiveProject } from '../types';

const StatusTrackerPage: React.FC = () => {
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ActiveProject | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId.trim()) return;

    setLoading(true);
    setError('');
    setProject(null);

    const result = await getProjectStatus(projectId.trim());
    
    if (result.success) {
      if (result.data) {
        setProject(result.data);
      } else {
        setError('Project ID not found. Please check and try again.');
      }
    } else {
      setError(`Database Error: ${result.error}. Please contact support or check database permissions.`);
    }
    setLoading(false);
  };

  const phases = ['Discovery', 'Design', 'Development', 'Testing', 'Launch'];
  const currentPhaseIndex = project ? phases.indexOf(project.status) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 py-20 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Client Project Tracker</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real-time updates on your digital product. Enter your Project ID below.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Enter Project ID (e.g., PROJ-123)" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none text-lg"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 rounded-xl transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Track'}
            </button>
          </form>
          
          <div className="text-center text-sm text-slate-500 mb-8">
             Tip: Try entering <span className="font-mono bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">DEMO-123</span> to see how it works.
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-2 mb-8"
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}

            {project && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-t border-gray-100 dark:border-slate-700 pt-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.clientName}</h2>
                    <p className="text-slate-500 dark:text-slate-400">Project ID: {project.projectId}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-bold">
                    {project.progress}% Complete
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-slate-700 h-4 rounded-full mb-12 overflow-hidden">
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-600 rounded-full"
                   />
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 relative">
                   <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-slate-700 -z-10 transform -translate-y-1/2"></div>
                   {phases.map((phase, idx) => {
                     const isCompleted = idx < currentPhaseIndex;
                     const isCurrent = idx === currentPhaseIndex;
                     
                     return (
                       <div key={phase} className="flex flex-col items-center text-center">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 mb-2 z-10 ${
                            isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                            isCurrent ? 'bg-white dark:bg-slate-800 border-blue-600 text-blue-600' : 
                            'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-300'
                         }`}>
                            {isCompleted ? <CheckCircle size={18} /> : isCurrent ? <Clock size={18} /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                         </div>
                         <span className={`text-sm font-bold ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                           {phase}
                         </span>
                       </div>
                     );
                   })}
                </div>

                {/* Status Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                     <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                       <FileText size={18} className="text-blue-500" /> Latest Update
                     </h3>
                     <p className="text-slate-600 dark:text-slate-300">{project.lastUpdate}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                     <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                       <Clock size={18} className="text-orange-500" /> Next Milestone
                     </h3>
                     <p className="text-slate-600 dark:text-slate-300">{project.nextMilestone}</p>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StatusTrackerPage;
