import React from 'react';
import { useServices } from '../services/hooks';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';

const ServicesPage: React.FC = () => {
  const { data: services, loading } = useServices();

  if (loading) return <div className="h-96 flex items-center justify-center text-blue-600 dark:text-blue-400">Loading Services...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions designed to help your business grow and compete in the modern landscape.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services currently listed.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;