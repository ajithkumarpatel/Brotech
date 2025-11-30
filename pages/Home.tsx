
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent, useServices, useTestimonials, usePosts, useProjects, useStats } from '../services/hooks';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';

const Home: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent();
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();
  const { data: posts } = usePosts();
  const { data: projects } = useProjects();
  const { data: fetchedStats, loading: statsLoading } = useStats();

  // Default stats fallback if DB is empty
  const defaultStats = [
    { id: '1', label: 'Projects Completed', value: '150+', order: 1 },
    { id: '2', label: 'Client Satisfaction', value: '98%', order: 2 },
    { id: '3', label: 'Support', value: '24/7', order: 3 },
    { id: '4', label: 'Years Experience', value: '5+', order: 4 }
  ];

  // Use fetched stats if available, otherwise defaults. Sort by order if present.
  const displayStats = fetchedStats.length > 0 
    ? [...fetchedStats].sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultStats;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  if (contentLoading) return <div className="h-screen flex items-center justify-center text-blue-600 dark:text-blue-400">Loading...</div>;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase mb-6">
              {content?.heroTagline}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
              {content?.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {content?.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-flex justify-center items-center py-4 px-8 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/portfolio" className="inline-flex justify-center items-center py-4 px-8 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-blue-600 dark:bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center"
          >
            {displayStats.map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                 <div className="text-4xl font-bold mb-1">{stat.value}</div>
                 <div className="text-blue-200 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Expertise</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Solutions tailored to your business needs.</p>
            </motion.div>
            <Link to="/services" className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Preview (Portfolio) */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Recent Work</h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Check out our latest successful deliveries.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 dark:bg-slate-800">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{project.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-2">{project.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="inline-block border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Client Stories</h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Don't just take our word for it.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, idx) => (
              <TestimonialCard key={t.id} testimonial={t} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your business?</h2>
            <p className="text-xl text-slate-400 mb-10">Join the hundreds of companies that trust Brotech with their digital presence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                 Contact Us
               </Link>
               <Link to="/careers" className="bg-transparent border border-slate-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                 Join our Team
               </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Insights</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Trends, news, and tech updates.</p>
            </motion.div>
            <Link to="/blog" className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700">
              Read Blog <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, idx) => (
               <Link to={`/blog/${post.id}`} key={post.id} className="group cursor-pointer">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="overflow-hidden rounded-xl bg-gray-200 dark:bg-slate-800 aspect-video mb-4">
                      {post.imageUrl ? (
                         <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600">
                          <span className="text-4xl font-bold opacity-25">Blog</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded uppercase">{post.category}</span>
                      <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                  </motion.div>
               </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
