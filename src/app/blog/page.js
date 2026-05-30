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
              <a
                key={art._id || art.id}
                href={`/blog/${art.slug}`}
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

              </a>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
