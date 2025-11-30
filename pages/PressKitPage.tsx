
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { useBrandAssets } from '../services/hooks';

const PressKitPage: React.FC = () => {
  const { data: assets, loading } = useBrandAssets();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Assets...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Press Kit & Brand Assets</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Official logos, colors, and guidelines for media partners and affiliates.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
           <ImageIcon className="text-blue-600" /> Logos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {assets.filter(a => a.type === 'Logo' || a.type === 'Image').map(asset => (
              <motion.div key={asset.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 flex flex-col items-center">
                 <div className="h-32 flex items-center justify-center mb-4 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-700">
                    <img src={asset.previewUrl || asset.fileUrl} alt={asset.title} className="max-h-20 max-w-[80%]" />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-1">{asset.title}</h3>
                 <span className="text-xs text-slate-500 mb-4">{asset.type}</span>
                 <a href={asset.fileUrl} download className="w-full py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-700 dark:text-white flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                    <Download size={16} /> Download
                 </a>
              </motion.div>
           ))}
           {assets.length === 0 && <div className="text-slate-400">No logos uploaded.</div>}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
           <Palette className="text-purple-600" /> Color Palette
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
           {assets.filter(a => a.type === 'Color').map(asset => (
              <div key={asset.id} className="flex flex-col">
                 <div className="h-24 w-full rounded-xl shadow-sm mb-3" style={{ backgroundColor: asset.value }}></div>
                 <div className="flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white text-sm">{asset.title}</h4>
                       <span className="text-xs text-slate-500 uppercase">{asset.value}</span>
                    </div>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(asset.value || ''); alert('Copied!'); }}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      Copy
                    </button>
                 </div>
              </div>
           ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Need something else?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                 Contact our press team for high-res images, interview requests, or specific asset needs.
              </p>
           </div>
           <a href="mailto:press@brotech.com" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
              Contact Press Team
           </a>
        </div>
      </div>
    </div>
  );
};

export default PressKitPage;
