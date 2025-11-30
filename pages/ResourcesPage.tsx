
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckSquare, BookOpen, Lock } from 'lucide-react';
import { useResources, subscribeNewsletter } from '../services/hooks';

const ResourcesPage: React.FC = () => {
  const { data: resources, loading } = useResources();
  const [email, setEmail] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (id: string, url: string) => {
    if (!email) {
      alert("Please enter your email to unlock these resources.");
      return;
    }
    setDownloadingId(id);
    // Simulate API call / Subscribe user
    await subscribeNewsletter(email);
    
    // Fake delay then "download"
    setTimeout(() => {
      window.open(url, '_blank'); // In real app, this would be the actual file URL
      setDownloadingId(null);
      alert("Download started! (Demo)");
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-purple-700 dark:bg-purple-900 py-24 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Free guides, checklists, and templates to help you grow your digital business.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        
        {/* Email Gate */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-16 border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
             <Lock size={32} />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Unlock All Resources</h3>
            <p className="text-slate-500 dark:text-slate-400">Enter your email once to access unlimited downloads.</p>
          </div>
          <div className="w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full md:w-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {loading ? <div className="dark:text-white">Loading...</div> : resources.map((resource, idx) => (
             <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
             >
                <div className="h-48 bg-gray-200 dark:bg-slate-700 relative flex items-center justify-center">
                   {resource.type === 'E-Book' && <BookOpen size={64} className="text-slate-400" />}
                   {resource.type === 'Checklist' && <CheckSquare size={64} className="text-slate-400" />}
                   {resource.type === 'PDF' && <FileText size={64} className="text-slate-400" />}
                   <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 shadow-sm">
                      {resource.type}
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{resource.title}</h3>
                   <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{resource.description}</p>
                   <button 
                     onClick={() => handleDownload(resource.id, resource.downloadUrl)}
                     disabled={downloadingId === resource.id}
                     className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                   >
                     {downloadingId === resource.id ? 'Unlocking...' : 'Download Now'} <Download size={18} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
