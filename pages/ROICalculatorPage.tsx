
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROICalculatorPage: React.FC = () => {
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2);
  const [orderValue, setOrderValue] = useState(100);
  
  const currentRevenue = visitors * (conversionRate / 100) * orderValue;
  // Conservative estimate: A new site typically improves conversion by 20-50%
  const improvedConversion = conversionRate * 1.5; 
  const projectedRevenue = visitors * (improvedConversion / 100) * orderValue;
  const increase = projectedRevenue - currentRevenue;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-green-600 dark:bg-green-800 py-20 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Website ROI Calculator</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            See how much revenue you're leaving on the table with an outdated website.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Inputs */}
            <div className="p-8 md:p-12 border-r border-gray-100 dark:border-slate-700">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                 <Calculator size={24} className="text-blue-600" /> Current Metrics
               </h3>
               
               <div className="space-y-8">
                 <div>
                   <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Monthly Website Visitors</label>
                   <input 
                     type="range" min="100" max="50000" step="100" 
                     value={visitors} onChange={e => setVisitors(Number(e.target.value))}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                   <div className="mt-2 text-blue-600 dark:text-blue-400 font-bold text-xl">{visitors.toLocaleString()}</div>
                 </div>

                 <div>
                   <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Conversion Rate (%)</label>
                   <input 
                     type="range" min="0.1" max="10" step="0.1" 
                     value={conversionRate} onChange={e => setConversionRate(Number(e.target.value))}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                   <div className="mt-2 text-blue-600 dark:text-blue-400 font-bold text-xl">{conversionRate}%</div>
                 </div>

                 <div>
                   <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Avg. Customer Value ($)</label>
                   <input 
                     type="range" min="10" max="5000" step="10" 
                     value={orderValue} onChange={e => setOrderValue(Number(e.target.value))}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                   <div className="mt-2 text-blue-600 dark:text-blue-400 font-bold text-xl">${orderValue.toLocaleString()}</div>
                 </div>
               </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 dark:bg-slate-900 p-8 md:p-12 flex flex-col justify-center">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Potential Growth</h3>
               
               <div className="space-y-6 mb-12">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                    <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Current Monthly Revenue</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">${currentRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                 </div>
                 
                 <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <TrendingUp size={64} className="text-green-600" />
                    </div>
                    <div className="relative z-10">
                       <div className="text-green-800 dark:text-green-300 text-sm font-bold uppercase tracking-wider mb-1">Potential Monthly Revenue</div>
                       <div className="text-4xl font-extrabold text-green-600 dark:text-green-400">${projectedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                       <div className="mt-2 text-green-700 dark:text-green-300 font-medium flex items-center gap-1">
                          <ArrowRight size={16} /> That's an extra <span className="underline decoration-green-500 decoration-2">${increase.toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</span>
                       </div>
                    </div>
                 </div>
               </div>

               <div className="text-center">
                  <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                    Based on a conservative 50% improvement in conversion rate through better design, speed, and UX.
                  </p>
                  <Link to="/contact" className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                     Unlock This Revenue <DollarSign size={18} className="ml-1" />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorPage;
