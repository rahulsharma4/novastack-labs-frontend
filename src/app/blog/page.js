'use client';

import React, { useState, useEffect } from 'react';
import { blogData } from '../../data/blogData';
import { Search, Calendar, User, ArrowRight, X, Clock, Sparkles } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState(null);

  const categories = [
    'All', 'Web Development', 'Databases', 'DevOps', 'UI/UX Design', 
    'Healthcare Technology', 'SEO Optimization', 'Mobile Development', 
    'AI Integration', 'Web Monitoring', 'test', 'test 1'
  ];

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiBase}/blogs`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback to static data');
      })
      .then(data => {
        if (data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(blogData);
        }
      })
      .catch(() => {
        // Fallback to static seeder dataset if offline
        setBlogs(blogData);
      });
  }, []);

  const filteredArticles = blogs.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate related posts for current reading article
  const getRelatedPosts = (article) => {
    if (!article) return [];
    return blogs
      .filter(b => b.category === article.category && (b._id !== article._id && b.id !== article.id))
      .slice(0, 3);
  };

  const related = getRelatedPosts(readingArticle);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-indigo-650 dark:text-emerald-400 uppercase tracking-widest block mb-3 flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3 text-indigo-500" /> Insights Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">The NovaStack Log</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Deep dives into server performance optimization, multi-tenant databases scaling, headless store conversions, and core system architectures.
        </p>
      </section>

      {/* Search and Category Filters */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all duration-200 ${
                selectedCategory === c
                  ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-4 mb-20">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-xs">
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art._id || art.id}
                id={art._id || art.id}
                onClick={() => setReadingArticle(art)}
                className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                
                {/* Card Header with illustration / image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
                  <img 
                    src={art.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500"} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" 
                  />
                  
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 z-20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-indigo-550/90 text-white shadow-sm">
                    {art.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 font-mono mb-2">
                      <Clock className="h-3 w-3" /> {art.readTime || '5 min read'}
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-650 dark:group-hover:text-emerald-450 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase shrink-0">
                        {art.author ? art.author[0] : 'N'}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] font-bold text-slate-800 dark:text-slate-400 truncate">{art.author}</span>
                        <span className="block text-[8px] text-slate-400 truncate">{art.role}</span>
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-0.5 shrink-0 uppercase tracking-wider transition-all">
                      Read More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reading Article Full Modal Detail View */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          
          {/* Custom style injection */}
          {readingArticle.cssContent && (
            <style dangerouslySetInnerHTML={{ __html: readingArticle.cssContent }} />
          )}
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{readingArticle.category}</span>
                <h3 className="text-md font-extrabold text-slate-900 dark:text-white mt-1">{readingArticle.title}</h3>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 focus:outline-none transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              
              {/* Featured Image */}
              {readingArticle.imageUrl && (
                <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0 shadow-sm">
                  <img 
                    src={readingArticle.imageUrl} 
                    alt={readingArticle.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div className="flex items-center gap-4 text-[10px] text-slate-400 mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 shrink-0">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-indigo-550" /> By {readingArticle.author} ({readingArticle.role})</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-indigo-550" /> {readingArticle.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-indigo-550" /> {readingArticle.readTime}</span>
              </div>

              {/* Dynamic HTML Content or Summary Fallback */}
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 text-xs">
                {readingArticle.content ? (
                  <div dangerouslySetInnerHTML={{ __html: readingArticle.content }} />
                ) : (
                  <>
                    <p className="font-semibold text-slate-800 dark:text-white mb-4">
                      {readingArticle.summary}
                    </p>
                    <p>
                      In production environments scaling past hundreds of thousands of active request logs, system architectures often experience load friction. This article outlines the exact mitigation scripts we employ at NovaStack Labs to reduce query latency, partition database nodes, and cache configurations.
                    </p>
                  </>
                )}
              </div>

              {/* Tags */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-[10px] text-slate-500">
                <span className="font-bold uppercase tracking-wider block mb-1.5">Article tags:</span>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(readingArticle.tags) ? (
                    readingArticle.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">#{t}</span>
                    ))
                  ) : (
                    readingArticle.tags ? readingArticle.tags.split(',').map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">#{t.trim()}</span>
                    )) : null
                  )}
                </div>
              </div>

              {/* Related Posts Section */}
              {related.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-4">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] mb-4 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> Related Posts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map(rel => (
                      <div 
                        key={rel._id || rel.id}
                        onClick={() => setReadingArticle(rel)}
                        className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-55/10 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-all flex flex-col justify-between gap-2"
                      >
                        <div>
                          <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-widest block">{rel.category}</span>
                          <h5 className="font-bold text-slate-800 dark:text-white text-[10px] line-clamp-2 mt-1 hover:text-indigo-500">{rel.title}</h5>
                        </div>
                        <span className="text-[8px] text-slate-400 block font-mono">{rel.readTime || '5 min'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-right">
              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close Read
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
