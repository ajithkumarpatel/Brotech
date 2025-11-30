import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../services/hooks';
import { Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPage: React.FC = () => {
  const { data: posts, loading } = usePosts();

  if (loading) return <div className="h-96 flex items-center justify-center text-blue-600 dark:text-blue-400">Loading Articles...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
       <div className="bg-gray-50 dark:bg-slate-950 py-20 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">The Brotech Blog</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Insights, tutorials, and news from our team.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-start group"
            >
              <div className="w-full md:w-1/3 aspect-video bg-gray-200 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                 {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600 font-bold">No Image</div>
                 )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-semibold uppercase tracking-wider">{post.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">Read Article &rarr;</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;