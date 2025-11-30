
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../services/hooks';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import ReadingProgressBar from '../components/ReadingProgressBar';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: posts, loading } = usePosts();
  
  // In a real large app, we might fetch a single doc, but here we reuse the hook
  const post = posts.find(p => p.id === id);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  
  if (!post) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-slate-500">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="bg-white dark:bg-white min-h-screen pb-20 relative">
      <ReadingProgressBar />
      
      {/* Header Image */}
      <div className="w-full h-80 md:h-96 bg-gray-200 relative">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
               <div className="flex items-center gap-2">
                <Tag size={16} />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
          <p className="lead text-xl text-slate-600 mb-8 font-light">{post.excerpt}</p>
          {/* Rendering content safely - assuming trusted plain text or basic markup. 
              For production with HTML content, use a sanitizer library. 
              Here we display as text with line breaks for simplicity if standard string.
          */}
          <div className="whitespace-pre-wrap text-slate-800">
            {post.content}
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link to="/contact" className="block p-8 bg-blue-50 rounded-2xl text-center hover:bg-blue-100 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Have a project in mind?</h3>
            <p className="text-blue-700">Contact our team to discuss how we can help you build {post.category ? post.category.toLowerCase() : 'digital'} solutions.</p>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
