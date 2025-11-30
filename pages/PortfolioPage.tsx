
import React, { useState } from 'react';
import { useProjects } from '../services/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const { data: projects, loading, error } = useProjects();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Projects...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-slate-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Work</h1>
          <p className="text-slate-500 dark:text-slate-400">A showcase of our best projects and case studies.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
             <AlertTriangle size={48} className="text-amber-500 mb-4" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connection Issue</h3>
             <p className="max-w-md text-center mt-2">We couldn't load the projects. This is likely a security permission issue in the database settings.</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {projects.length === 0 ? (
                <div className="text-center py-20 text-slate-500 dark:text-slate-400">No projects found. Add some to your 'projects' collection!</div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredProjects.map(project => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={project.id}
                        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col"
                      >
                        <Link to={`/portfolio/${project.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-slate-800">
                          {project.imageUrl ? (
                             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">No Image</div>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold border border-white px-4 py-2 rounded-full flex items-center gap-2">
                               View Case Study <ArrowRight size={16} />
                            </span>
                          </div>
                        </Link>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-2">
                             <Link to={`/portfolio/${project.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                             </Link>
                             <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded font-bold uppercase">{project.category}</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.techStack.map(tech => (
                              <span key={tech} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
