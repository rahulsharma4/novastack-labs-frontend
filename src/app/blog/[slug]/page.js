'use client';

import React, { use, useState, useEffect } from 'react';
import { blogData } from '../../../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Sparkles, Tag, BookOpen, TrendingUp } from 'lucide-react';

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const [article, setArticle] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
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
        const staticArt = blogData.find(b => b.slug === slug);
        setArticle(staticArt || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 min-h-[70vh] flex items-center justify-center bg-white text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-white text-slate-800 gap-4">
        <h2 className="text-lg font-extrabold uppercase tracking-wide">Article Not Found</h2>
        <p className="text-xs text-slate-500">The post you are searching for does not exist or has been removed.</p>
        <a href="/blog" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </a>
      </div>
    );
  }

  // Related posts: same category, exclude current, max 5
  const relatedPosts = blogs
    .filter(b => b.category === article.category && (b._id !== article._id && b.id !== article.id))
    .slice(0, 5);

  // Recent posts: exclude current, max 5
  const recentPosts = blogs
    .filter(b => (b._id !== article._id && b.id !== article.id))
    .slice(0, 5);

  const sidebarPosts = relatedPosts.length > 0 ? relatedPosts : recentPosts;
  const sidebarTitle = relatedPosts.length > 0 ? 'Related Posts' : 'Recent Posts';

  return (
    <div className="relative min-h-screen bg-white text-slate-800 transition-colors duration-300">
      
      {/* Custom Scoped CSS Styles */}
      {article.cssContent && (
        <style dangerouslySetInnerHTML={{ __html: article.cssContent }} />
      )}

      {/* Decorative backdrop gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute top-[200px] -left-[200px] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-3xl"></div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Back Button */}
        <div className="mb-8">
          <a 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights Hub
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ===== LEFT COLUMN: Blog Content ===== */}
          <article className="flex-1 min-w-0">

            {/* Category badge & title */}
            <div className="flex flex-col gap-4 mb-6">
              <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm w-fit">
                {article.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {article.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                {article.summary}
              </p>
            </div>

            {/* Metadata info */}
            <div className="flex flex-wrap items-center gap-5 text-[10px] text-slate-400 mb-8 border-b border-slate-100 pb-6">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-indigo-500" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-indigo-500" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-500" /> {article.readTime || '5 min read'}
              </span>
            </div>

            {/* Featured Banner Image */}
            {article.imageUrl && (
              <div className="w-full h-56 sm:h-[400px] rounded-2xl overflow-hidden border border-slate-100 mb-10 shadow-sm">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}

            {/* Render Article HTML Content */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed mb-12">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-slate-800 text-base">
                    {article.summary}
                  </p>
                  <p>
                    In production environments scaling past hundreds of thousands of active request logs, system architectures often experience load friction. This article outlines the exact mitigation scripts we employ at NovaStack Labs to reduce query latency, partition database nodes, and cache configurations.
                  </p>
                </div>
              )}
            </div>

            {/* Tags Block */}
            {article.tags && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] text-slate-500 mb-10">
                <span className="font-bold uppercase tracking-wider block mb-2.5 text-slate-400 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> Article Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(article.tags) ? (
                    article.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 font-medium">#{t}</span>
                    ))
                  ) : (
                    article.tags.split(',').map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 font-medium">#{t.trim()}</span>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Author Card */}
            <div className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-2xl border border-slate-100 flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                {article.author ? article.author.charAt(0) : 'N'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Written By</span>
                <h4 className="text-sm font-bold text-slate-800">{article.author}</h4>
                <span className="text-[10px] text-slate-400">{article.role || 'NovaStack Labs'}</span>
              </div>
            </div>

          </article>

          {/* ===== RIGHT COLUMN: Sidebar ===== */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
              
              {/* Related / Recent Posts */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> {sidebarTitle}
                  </h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {sidebarPosts.length > 0 ? (
                    sidebarPosts.map(rel => (
                      <a 
                        key={rel._id || rel.id}
                        href={`/blog/${rel.slug}`}
                        className="flex items-start gap-3 p-4 hover:bg-slate-50/80 transition-colors group"
                      >
                        {rel.imageUrl ? (
                          <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                            <img src={rel.imageUrl} alt={rel.title} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-100 to-emerald-50 flex items-center justify-center shrink-0 border border-slate-100">
                            <BookOpen className="h-5 w-5 text-indigo-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-slate-700 text-[11px] line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                            {rel.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] text-slate-400 font-mono">{rel.date}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="p-5 text-center text-[10px] text-slate-400">
                      No related posts found.
                    </div>
                  )}
                </div>
              </div>

              {/* Categories Quick Nav */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Categories
                  </h3>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {[...new Set(blogs.map(b => b.category).filter(Boolean))].slice(0, 8).map(cat => (
                    <a 
                      key={cat}
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                        cat === article.category 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA Mini */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Stay Updated</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                  Get the latest insights on web performance, SaaS architecture, and engineering best practices.
                </p>
                <a 
                  href="/contact"
                  className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:shadow-lg transition-all"
                >
                  Subscribe Now
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
