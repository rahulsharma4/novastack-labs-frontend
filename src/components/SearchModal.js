'use client';

import { useState, useEffect } from 'react';
import { Search, X, BookOpen, Layers, Briefcase } from 'lucide-react';
import { blogData } from '../data/blogData';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ services: [], portfolio: [], blog: [] });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ services: [], portfolio: [], blog: [] });
      return;
    }

    const q = query.toLowerCase();

    const matchedServices = servicesData.filter(
      (s) => s.title.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q)
    );

    const matchedPortfolio = portfolioData.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    const matchedBlog = blogData.filter(
      (b) => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)
    );

    setResults({ services: matchedServices, portfolio: matchedPortfolio, blog: matchedBlog });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="h-5 w-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, portfolio, blog articles..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[400px] overflow-y-auto p-4 flex flex-col gap-6">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              Type something to search the NovaStack Labs directory.
            </div>
          ) : results.services.length === 0 && results.portfolio.length === 0 && results.blog.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No results found for &ldquo;<span className="text-slate-300 font-semibold">{query}</span>&rdquo;.
            </div>
          ) : (
            <>
              {/* Services matches */}
              {results.services.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Layers className="h-3 w-3" /> Services
                  </h4>
                  <div className="flex flex-col gap-2">
                    {results.services.map((item) => (
                      <a
                        key={item.id}
                        href={`/services#${item.id}`}
                        onClick={onClose}
                        className="p-3 bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800 rounded-xl block transition-colors group"
                      >
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-400 block transition-colors">{item.title}</span>
                        <span className="text-xs text-slate-400 mt-1 block">{item.shortDesc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio matches */}
              {results.portfolio.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Briefcase className="h-3 w-3" /> Case Studies
                  </h4>
                  <div className="flex flex-col gap-2">
                    {results.portfolio.map((item) => (
                      <a
                        key={item.id}
                        href={`/portfolio#${item.id}`}
                        onClick={onClose}
                        className="p-3 bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800 rounded-xl block transition-colors group"
                      >
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-400 block transition-colors">{item.title}</span>
                        <span className="text-xs text-slate-400 mt-1 block">{item.summary}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog matches */}
              {results.blog.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" /> Insights & Blog
                  </h4>
                  <div className="flex flex-col gap-2">
                    {results.blog.map((item) => (
                      <a
                        key={item.id}
                        href={`/blog#${item.id}`}
                        onClick={onClose}
                        className="p-3 bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800 rounded-xl block transition-colors group"
                      >
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-400 block transition-colors">{item.title}</span>
                        <span className="text-xs text-slate-400 mt-1 block">{item.summary}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

