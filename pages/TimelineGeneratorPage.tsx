
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimelineGeneratorPage: React.FC = () => {
  const [projectType, setProjectType] = useState('Corporate Website');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<{
    launchDate: string;
    phases: { name: string; duration: string; end: string }[];
  } | null>(null);

  const calculateTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    const start = new Date(startDate);
    let weeks = 4;
    
    if (projectType === 'Landing Page') weeks = 2;
    if (projectType === 'E-Commerce Store') weeks = 8;
    if (projectType === 'Custom Web App') weeks = 12;
    if (projectType === 'Mobile App') weeks = 16;

    const launchDate = new Date(start);
    launchDate.setDate(start.getDate() + (weeks * 7));

    // Simple phase breakdown
    const phase1End = new Date(start); phase1End.setDate(start.getDate() + (weeks * 7 * 0.2)); // Discovery 20%
    const phase2End = new Date(start); phase2End.setDate(start.getDate() + (weeks * 7 * 0.5)); // Design 30%
    const phase3End = new Date(start); phase3End.setDate(start.getDate() + (weeks * 7 * 0.9)); // Dev 40%
    // Launch is 100%

    setResult({
      launchDate: launchDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      phases: [
        { name: "Discovery & Strategy", duration: `${Math.round(weeks * 0.2)} weeks`, end: phase1End.toLocaleDateString() },
        { name: "UI/UX Design", duration: `${Math.round(weeks * 0.3)} weeks`, end: phase2End.toLocaleDateString() },
        { name: "Development", duration: `${Math.round(weeks * 0.4)} weeks`, end: phase3End.toLocaleDateString() },
        { name: "QA & Launch", duration: `${Math.round(weeks * 0.1)} weeks`, end: launchDate.toLocaleDateString() },
      ]
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-blue-600 dark:bg-blue-900 py-20 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Project Timeline Generator</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Plan your launch. See exactly how long your digital project will take.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
             <form onSubmit={calculateTimeline} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Project Type</label>
                   <select 
                     className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     value={projectType}
                     onChange={(e) => setProjectType(e.target.value)}
                   >
                      <option>Landing Page</option>
                      <option>Corporate Website</option>
                      <option>E-Commerce Store</option>
                      <option>Custom Web App</option>
                      <option>Mobile App</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Desired Start Date</label>
                   <input 
                     type="date" 
                     required
                     className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                   />
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                   Generate Timeline <ArrowRight size={18} />
                </button>
             </form>
          </div>

          <div className="p-8">
             {!result ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                   <Clock size={48} className="mx-auto mb-4 opacity-20" />
                   <p>Select your project details above to see the schedule.</p>
                </div>
             ) : (
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                >
                   <div className="text-center mb-12">
                      <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Estimated Launch Date</h2>
                      <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">{result.launchDate}</div>
                   </div>

                   <div className="relative border-l-4 border-blue-200 dark:border-blue-900 ml-4 md:ml-12 space-y-8 pl-8 md:pl-12 py-4">
                      {result.phases.map((phase, idx) => (
                         <motion.div 
                           key={idx}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className="relative"
                         >
                            <div className="absolute -left-[46px] md:-left-[62px] top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs border-4 border-white dark:border-slate-800">
                               {idx + 1}
                            </div>
                            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                               <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                  <div>
                                     <h3 className="text-lg font-bold text-slate-900 dark:text-white">{phase.name}</h3>
                                     <p className="text-sm text-slate-500 dark:text-slate-400">Duration: {phase.duration}</p>
                                  </div>
                                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                                     Complete by: {phase.end}
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                      ))}
                   </div>

                   <div className="mt-12 text-center">
                      <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                         Lock in this Schedule <CheckCircle size={18} />
                      </Link>
                   </div>
                </motion.div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineGeneratorPage;
