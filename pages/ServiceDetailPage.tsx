
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../services/hooks';
import { ArrowLeft, CheckCircle, Code, Layout, Database, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  code: Code,
  layout: Layout,
  database: Database,
  zap: Zap,
};

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: services, loading } = useServices();
  
  // In a production app, we might fetch only the specific doc.
  const service = services.find(s => s.id === id);

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Service...</div>;
  
  if (!service) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-slate-500">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <Link to="/services" className="text-blue-600 hover:underline">Back to Services</Link>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Terminal;
  
  // Fallback features if database field is empty
  const features = service.features && service.features.length > 0 
    ? service.features 
    : [
        "Professional Analysis",
        "Dedicated Support Team",
        "Scalable Architecture",
        "Performance Optimization",
        "Secure Implementation"
    ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Services
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-blue-600 dark:text-blue-400">
               <IconComponent size={48} />
            </div>
            <div>
               <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h1>
               <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl">{service.description}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Main Content */}
           <div className="lg:col-span-2 prose prose-lg prose-slate dark:prose-invert">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About this Service</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                 {service.longDescription || 
                  `At Brotech WebSolutions, our ${service.title} service is designed to exceed your expectations. 
                   We combine industry best practices with cutting-edge technology to deliver results that drive growth. 
                   Whether you are a startup or an established enterprise, our team works closely with you to understand your unique challenges and goals.`}
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                 {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                       <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                       <span className="font-medium text-slate-700 dark:text-slate-200">{feature}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Sidebar CTA */}
           <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to start?</h3>
                 <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Get a custom quote for your {service.title} project today.</p>
                 
                 <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                    <span className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Starting from</span>
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{service.priceStart}</span>
                 </div>

                 <div className="space-y-3">
                    <Link 
                      to="/contact" 
                      state={{ message: `I would like to get a quote for the ${service.title} service.` }}
                      className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded-xl transition-colors"
                    >
                       Get a Quote
                    </Link>
                    <Link to="/schedule" className="block w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-center rounded-xl transition-colors">
                       Book Consultation
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
