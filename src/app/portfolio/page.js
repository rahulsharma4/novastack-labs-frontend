'use client';

import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Filter, CheckCircle, ArrowRight, X, Cpu, Landmark, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const categories = ['All', 'Healthcare', 'Finance', 'Education', 'Ecommerce', 'Logistics', 'Real Estate', 'Manufacturing', 'SaaS Platforms', 'Startups'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter(p => p.category === selectedCategory);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-3">Case Studies</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Our Work in Production</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Review our 12 premium case studies detailing real-world problems solved, database architectures selected, and quantitative metrics achieved.
        </p>
      </section>

      {/* Categories Filter Carousel */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 mr-2 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="group border border-slate-200/80 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/20 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg transition-all duration-350 cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{proj.category}</span>
                  <span className="text-[9px] font-bold text-slate-400 font-mono">{proj.year}</span>
                </div>
                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {proj.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-450 border border-slate-100 dark:border-slate-850">{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between bg-white/50 dark:bg-slate-900/10">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Impact Metric:</span>
                  <span className="block text-sm font-extrabold text-slate-800 dark:text-emerald-400">{Object.values(proj.metrics)[0]}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  View Study <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">{activeProject.category}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{activeProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6">
              
              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-4 text-center bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
                {Object.entries(activeProject.metrics).map(([key, val]) => (
                  <div key={key}>
                    <span className="block text-lg font-extrabold text-slate-900 dark:text-emerald-400">{val}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">{key}</span>
                  </div>
                ))}
              </div>

              {/* Problem block */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Landmark className="h-3.5 w-3.5" /> The Business Challenge
                </h4>
                <p className="text-xs text-slate-655 dark:text-slate-350 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
                  {activeProject.problem}
                </p>
              </div>

              {/* Solution block */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" /> Technical Solution & Architecture
                </h4>
                <p className="text-xs text-slate-655 dark:text-slate-350 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
                  {activeProject.solution}
                </p>
              </div>

              {/* Results block */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Quantitative Results
                </h4>
                <p className="text-xs text-slate-655 dark:text-slate-350 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
                  {activeProject.results}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-center">
              <a
                href="/contact"
                className="px-6 py-2.5 inline-block bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-650 hover:to-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Discuss Similar Project
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
