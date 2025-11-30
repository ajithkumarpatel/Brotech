
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../services/hooks';
import { ArrowLeft, ExternalLink, Calendar, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, loading } = useProjects();
  
  const project = projects.find(p => p.id === id);

  if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Loading Project...</div>;
  
  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-slate-500">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/portfolio" className="text-blue-600 hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Hero Image */}
      <div className="h-[50vh] w-full bg-gray-200 dark:bg-slate-800 relative">
        {project.imageUrl && (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
             <Link to="/portfolio" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>
            <div className="flex items-center gap-4 text-white/90">
               <span className="bg-blue-600 px-3 py-1 rounded text-sm font-bold uppercase tracking-wider">{project.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About the Project</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert mb-12">
              <p className="whitespace-pre-wrap">{project.description}</p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Technologies</h3>
            <div className="flex flex-wrap gap-3 mb-12">
              {project.techStack.map(tech => (
                <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} className="text-blue-500" />
                  {tech}
                </div>
              ))}
            </div>

            {/* Mock Case Study Data since only basic fields exist in Project type currently */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
               <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">The Result</h3>
               <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                 We delivered a scalable, high-performance solution that met all client requirements. 
                 Since launch, the platform has seen increased engagement and stability.
               </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Project Info</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Layers size={16} /> Category</span>
                        <span className="font-medium text-slate-900 dark:text-white">{project.category}</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2"><Calendar size={16} /> Completed</span>
                        <span className="font-medium text-slate-900 dark:text-white">2024</span>
                     </div>
                  </div>
                  
                  <button className="w-full mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                     Visit Live Site <ExternalLink size={16} />
                  </button>
                </div>

                <div className="text-center p-8 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/30">
                   <h3 className="text-xl font-bold mb-2">Want a site like this?</h3>
                   <p className="text-blue-100 mb-6 text-sm">Let's build something amazing together.</p>
                   <Link to="/contact" className="inline-block w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                      Start Your Project
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
