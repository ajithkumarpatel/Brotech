
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Activity, Server, Database, Cloud } from 'lucide-react';

const SystemStatusPage: React.FC = () => {
  const services = [
    { name: 'Website Hosting', status: 'operational', icon: Cloud },
    { name: 'Database Clusters', status: 'operational', icon: Database },
    { name: 'API Gateway', status: 'operational', icon: Server },
    { name: 'Client Support Portal', status: 'operational', icon: Activity },
    { name: 'Email Delivery', status: 'operational', icon: Activity },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-bold text-sm mb-6">
               <CheckCircle size={16} /> All Systems Operational
             </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">System Status</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Live updates on the performance and availability of Brotech services.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden mb-12">
           <div className="divide-y divide-gray-100 dark:divide-slate-700">
             {services.map((service, idx) => (
               <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-300">
                       <service.icon size={20} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{service.name}</span>
                 </div>
                 <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                    <CheckCircle size={16} /> Operational
                 </div>
               </div>
             ))}
           </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Past Incidents</h3>
        <div className="space-y-6">
           <div className="border-l-4 border-gray-300 dark:border-slate-700 pl-6 py-2">
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Oct 24, 2024</div>
              <h4 className="font-bold text-slate-900 dark:text-white">Scheduled Maintenance</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                 Routine database upgrades were completed successfully. No downtime was observed.
              </p>
           </div>
           <div className="border-l-4 border-yellow-400 pl-6 py-2">
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sep 12, 2024</div>
              <h4 className="font-bold text-slate-900 dark:text-white">API Latency</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                 We experienced elevated response times for 15 minutes due to high traffic volume. Issue resolved.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPage;
