'use client';

import React, { use, useState, useEffect } from 'react';
import { blogData } from '../../../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Sparkles, MessageSquare, Heart } from 'lucide-react';

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const [article, setArticle] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // 1. Fetch all blogs to calculate related posts
    fetch(`${API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(blogData);
        }
      })
      .catch(() => setBlogs(blogData));

    // 2. Fetch the specific article by slug
    fetch(`${API_URL}/blogs/${slug}`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static seed data if offline
        const staticArt = blogData.find(b => b.slug === slug);
        setArticle(staticArt || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-indigo-650 border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 gap-4">
        <h2 className="text-lg font-extrabold uppercase tracking-wide">Article Not Found</h2>
        <p className="text-xs text-slate-500">The post you are searching for does not exist or has been removed.</p>
        <a href="/blog" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </a>
      </div>
    );
  }

  // Get related posts by same category
  const relatedPosts = blogs
    .filter(b => b.category === article.category && (b._id !== article._id && b.id !== article.id))
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Custom Scoped CSS Styles */}
      {article.cssContent && (
        <style dangerouslySetInnerHTML={{ __html: article.cssContent }} />
      )}

      {/* Decorative backdrop gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-[200px] -left-[200px] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-3xl"></div>
      </div>

      {/* Article Container */}
      <article className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Back Button */}
        <div className="mb-8">
          <a 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-650 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights Hub
          </a>
        </div>

        {/* Categories badge & title */}
        <div className="flex flex-col gap-4 mb-6">
          <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm w-fit">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {article.summary}
          </p>
        </div>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-5 text-[10px] text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6 shrink-0">
          <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-indigo-500" /> By {article.author} ({article.role})</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-indigo-500" /> {article.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-indigo-500" /> {article.readTime || '5 min read'}</span>
        </div>

        {/* Featured Banner Image */}
        {article.imageUrl && (
          <div className="w-full h-64 sm:h-[450px] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-10 shadow-md">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Render Article HTML Content */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-16">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-slate-800 dark:text-white text-base">
                {article.summary}
              </p>
              <p>
                In production environments scaling past hundreds of thousands of active request logs, system architectures often experience load friction. This article outlines the exact mitigation scripts we employ at NovaStack Labs to reduce query latency, partition database nodes, and cache configurations.
              </p>
            </div>
          )}
        </div>

        {/* Tags Block */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-150 dark:border-slate-800 text-[10px] text-slate-500 mb-16">
          <span className="font-bold uppercase tracking-wider block mb-2.5 text-slate-400">Article tags:</span>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(article.tags) ? (
              article.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">#{t}</span>
              ))
            ) : (
              article.tags ? article.tags.split(',').map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">#{t.trim()}</span>
              )) : null
            )}
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-6 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-500" /> Related Insights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <a 
                  key={rel._id || rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40 hover:border-indigo-500/40 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-widest block">{rel.category}</span>
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs line-clamp-2 mt-1.5 group-hover:text-indigo-650 transition-colors">{rel.title}</h5>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">{rel.readTime || '5 min'}</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </article>

    </div>
  );
}
