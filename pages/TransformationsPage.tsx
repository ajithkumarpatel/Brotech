
import React from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Link } from 'react-router-dom';
import { ArrowRight, Wand2 } from 'lucide-react';

const TransformationsPage: React.FC = () => {
  // Mock data for transformations. In production, fetch from 'projects' collection where 'beforeImageUrl' exists.
  const showcases = [
    {
      id: 1,
      title: "E-Commerce Overhaul",
      description: "We took a slow, dated Shopify store and transformed it into a lightning-fast custom headless storefront. Conversion rates doubled in 30 days.",
      before: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=800&blur=10", // Blurred for 'dated' effect
      after: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "SaaS Dashboard Redesign",
      description: "From a cluttered spreadsheet-like interface to a modern, dark-mode analytic dashboard that users actually enjoy using.",
      before: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&blur=5", 
      after: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" // Same img, just demoing concept
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 py-20 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full font-bold text-sm mb-6 border border-blue-600/30">
             <Wand2 size={16} /> Visual Proof
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Total Transformations</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            See the difference professional design and engineering makes. 
            Drag the slider to compare.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10">
        <div className="space-y-24">
          {showcases.map((item, idx) => (
             <div key={item.id} className="flex flex-col gap-8">
                <div className="text-center md:text-left">
                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h2>
                   <p className="text-slate-500 dark:text-slate-400 max-w-2xl">{item.description}</p>
                </div>
                
                <BeforeAfterSlider 
                   beforeImage={item.before} 
                   afterImage={item.after} 
                   altText={item.title} 
                />
             </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready for your transformation?</h2>
           <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              Redesign My Site <ArrowRight />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default TransformationsPage;
