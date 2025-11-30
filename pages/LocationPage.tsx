
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { useLocationData, useTestimonials } from '../services/hooks';

const LocationPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const { data: location, loading } = useLocationData(city || '');
  const { data: testimonials } = useTestimonials();

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Location Data...</div>;
  if (!location) return <div>Location not found</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      
      {/* Local SEO Hero */}
      <div className="bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 backdrop-blur-sm border border-blue-500/50 rounded-full mb-6 text-blue-200 font-bold text-sm">
             <MapPin size={16} /> Serving {location.cityName}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {location.heroTitle}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            {location.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
               to="/contact" 
               state={{ message: `I am looking for web services in ${location.cityName}.` }}
               className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
             >
                Get a Quote in {location.cityName}
             </Link>
             <Link to="/portfolio" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                View Portfolio
             </Link>
          </div>
        </motion.div>
      </div>

      {/* Local Relevance Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why {location.cityName} Businesses Choose Brotech</h2>
               <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                  We know the local market in {location.cityName}. Whether you are a startup in the city center or an established enterprise, we build digital solutions that help you dominate your local competitors.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                     <CheckCircle className="text-green-500" /> Fast, local-optimized loading speeds
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                     <CheckCircle className="text-green-500" /> SEO strategies tailored for {location.cityName}
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                     <CheckCircle className="text-green-500" /> 24/7 Support available in your time zone
                  </li>
               </ul>
            </div>
            <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
               {/* Placeholder Map Visualization */}
               <MapPin size={64} className="text-blue-600 dark:text-blue-400 z-10 animate-bounce" />
               <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover"></div>
               <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg font-bold text-slate-900 dark:text-white text-sm">
                     {location.cityName} HQ
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* Service Highlights */}
      <div className="bg-gray-50 dark:bg-slate-950 py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Top Services for {location.cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <Zap className="text-yellow-500 mb-4 h-10 w-10" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Custom Web Design</h3>
                  <p className="text-slate-500 dark:text-slate-400">Stand out in the {location.cityName} market with a unique, hand-coded website.</p>
               </div>
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <Shield className="text-blue-500 mb-4 h-10 w-10" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Secure E-Commerce</h3>
                  <p className="text-slate-500 dark:text-slate-400">Sell to customers in {location.cityName} and beyond with a robust online store.</p>
               </div>
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <MapPin className="text-green-500 mb-4 h-10 w-10" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Local SEO</h3>
                  <p className="text-slate-500 dark:text-slate-400">Rank #1 when people search for services in {location.cityName}.</p>
               </div>
            </div>
         </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center px-4">
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to grow in {location.cityName}?</h2>
         <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
            Start Your Project <ArrowRight />
         </Link>
      </div>

    </div>
  );
};

export default LocationPage;
