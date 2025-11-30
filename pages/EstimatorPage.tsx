
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEstimatorItems } from '../services/hooks';
import { EstimatorItem } from '../types';
import { 
  Check, DollarSign, ArrowRight, RefreshCw, Layout, Database, 
  Smartphone, ShoppingCart, Shield, Zap, Code, Server, 
  Globe, Layers, Lock, Cpu, MessageCircle 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  layout: Layout,
  database: Database,
  'shopping-cart': ShoppingCart,
  smartphone: Smartphone,
  shield: Shield,
  'dollar-sign': DollarSign,
  zap: Zap,
  code: Code,
  server: Server,
  globe: Globe,
  layers: Layers,
  lock: Lock,
  cpu: Cpu,
  'message-circle': MessageCircle
};

// Default values to use if Firestore is empty or loading initially
const DEFAULT_TYPES: EstimatorItem[] = [
  { id: 'landing', label: 'Landing Page', price: 1000, category: 'project_type', icon: 'layout' },
  { id: 'corporate', label: 'Corporate Website', price: 2500, category: 'project_type', icon: 'database' },
  { id: 'ecommerce', label: 'E-Commerce Store', price: 5000, category: 'project_type', icon: 'shopping-cart' },
  { id: 'webapp', label: 'Custom Web App', price: 8000, category: 'project_type', icon: 'smartphone' },
];

const DEFAULT_FEATURES: EstimatorItem[] = [
  { id: 'auth', label: 'User Login / Auth', price: 1000, category: 'feature', icon: 'shield' },
  { id: 'payment', label: 'Payment Integration', price: 1500, category: 'feature', icon: 'dollar-sign' },
  { id: 'cms', label: 'CMS (Admin Panel)', price: 2000, category: 'feature', icon: 'database' },
  { id: 'seo', label: 'Advanced SEO', price: 800, category: 'feature', icon: 'zap' },
  { id: 'chat', label: 'Chat Functionality', price: 1200, category: 'feature', icon: 'layout' },
];

const EstimatorPage: React.FC = () => {
  const { data: items, loading } = useEstimatorItems();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Use database items if available, otherwise use defaults
  const projectTypes = items.length > 0 
    ? items.filter(i => i.category === 'project_type').sort((a,b) => a.price - b.price)
    : DEFAULT_TYPES;

  const features = items.length > 0 
    ? items.filter(i => i.category === 'feature').sort((a,b) => a.price - b.price)
    : DEFAULT_FEATURES;

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const type = projectTypes.find(t => t.id === selectedType);
    if (type) total += Number(type.price);
    
    selectedFeatures.forEach(fid => {
      const feature = features.find(f => f.id === fid);
      if (feature) total += Number(feature.price);
    });

    return total;
  };

  const total = calculateTotal();

  const getIcon = (iconName: string) => {
    return ICON_MAP[iconName] || Layout;
  };

  // Helper for generating the quote message
  const getQuoteMessage = () => {
    const typeName = projectTypes.find(t => t.id === selectedType)?.label || 'Unknown Project';
    const featureNames = selectedFeatures.map(fid => features.find(f => f.id === fid)?.label).filter(Boolean).join(', ');
    return `I used the estimator. I'm looking for a ${typeName}. Features: ${featureNames}. Estimated Budget: $${total.toLocaleString()}.`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-blue-600 dark:bg-blue-900 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Project Cost Estimator</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Get a rough estimate for your next big idea in seconds.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          
          {/* Progress / Steps */}
          <div className="p-8 border-b border-gray-100 dark:border-slate-700">
             <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
               <span className={selectedType ? 'text-blue-600 dark:text-blue-400' : ''}>1. Project Type</span>
               <span className={selectedFeatures.length > 0 ? 'text-blue-600 dark:text-blue-400' : ''}>2. Features</span>
               <span className={showResult ? 'text-blue-600 dark:text-blue-400' : ''}>3. Estimate</span>
             </div>
             <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
               <div 
                 className="bg-blue-600 h-full transition-all duration-500"
                 style={{ width: showResult ? '100%' : selectedFeatures.length > 0 ? '66%' : selectedType ? '33%' : '5%' }}
               ></div>
             </div>
          </div>

          <div className="p-8">
            {loading && items.length === 0 ? (
               <div className="text-center py-12 text-slate-500">Loading calculator options...</div>
            ) : !showResult ? (
              <div className="space-y-12">
                {/* Step 1: Type */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">What are we building?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTypes.map(type => {
                      const Icon = getIcon(type.icon);
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            selectedType === type.id 
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                              : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }`}
                        >
                          <div className={`p-3 rounded-full ${selectedType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-slate-500'}`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{type.label}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Starts at ${Number(type.price).toLocaleString()}</div>
                          </div>
                          {selectedType === type.id && <Check className="ml-auto text-blue-600 dark:text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Step 2: Features */}
                <motion.section
                   initial={{ opacity: 0 }}
                   animate={{ opacity: selectedType ? 1 : 0.5, pointerEvents: selectedType ? 'auto' : 'none' }}
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Add-on Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {features.map(feature => {
                      const Icon = getIcon(feature.icon);
                      return (
                        <button
                          key={feature.id}
                          onClick={() => toggleFeature(feature.id)}
                          className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center gap-3 ${
                            selectedFeatures.includes(feature.id)
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 ring-1 ring-blue-600' 
                              : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
                          }`}
                        >
                          <Icon size={24} className={selectedFeatures.includes(feature.id) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{feature.label}</span>
                          <span className="text-xs text-slate-500">+${Number(feature.price).toLocaleString()}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.section>

                <div className="flex justify-end pt-8 border-t border-gray-100 dark:border-slate-700">
                  <button
                    disabled={!selectedType}
                    onClick={() => setShowResult(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                  >
                    Calculate Estimate <ArrowRight />
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Estimated Project Cost</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Based on your selections</p>
                
                <div className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                  ${total.toLocaleString()}
                </div>
                <p className="text-sm text-slate-400 mb-12">*Rough estimate. Final quote may vary.</p>

                <div className="max-w-md mx-auto bg-gray-50 dark:bg-slate-900 rounded-xl p-6 mb-12 text-left">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Breakdown</h4>
                  <div className="flex justify-between mb-2 text-slate-600 dark:text-slate-400">
                    <span>Base Project ({projectTypes.find(t => t.id === selectedType)?.label})</span>
                    <span>${Number(projectTypes.find(t => t.id === selectedType)?.price || 0).toLocaleString()}</span>
                  </div>
                  {selectedFeatures.map(fid => {
                    const f = features.find(feat => feat.id === fid);
                    return f ? (
                      <div key={f.id} className="flex justify-between mb-2 text-slate-600 dark:text-slate-400 text-sm">
                        <span>+ {f.label}</span>
                        <span>${Number(f.price).toLocaleString()}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link 
                     to="/contact" 
                     state={{ message: getQuoteMessage() }}
                     className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                   >
                     Request Formal Quote
                   </Link>
                   <button 
                     onClick={() => setShowResult(false)}
                     className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium px-8 py-3"
                   >
                     <RefreshCw size={18} /> Start Over
                   </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatorPage;
