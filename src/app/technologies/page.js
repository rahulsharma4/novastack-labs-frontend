'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, Code, Database, Server, Smartphone, Cloud, ArrowRight } from 'lucide-react';

export default function Technologies() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stack' },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Backend & APIs', icon: Server },
    { id: 'databases', name: 'Databases', icon: Database },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud }
  ];

  const technologies = [
    { name: 'Next.js', category: 'frontend', desc: 'React framework for performance, dynamic routing, and Edge SSR.', benefits: 'Lighthouse score of 95+, SEO readiness, fast loading.' },
    { name: 'React.js', category: 'frontend', desc: 'UI component library with virtual state management models.', benefits: 'Lag-free interactive panels, high code reusability.' },
    { name: 'Node.js', category: 'backend', desc: 'V8-powered asynchronous runtime driving network server tasks.', benefits: 'Event-driven scale, high socket bandwidth capacities.' },
    { name: 'Express.js', category: 'backend', desc: 'Minimalist web server routing framework for custom API systems.', benefits: 'Clean middleware separation, lightweight routes.' },
    { name: 'MongoDB', category: 'databases', desc: 'NoSQL document storage indexing JSON datasets dynamically.', benefits: 'Highly scalable schema patterns, easy collections query.' },
    { name: 'PostgreSQL', category: 'databases', desc: 'Object-relational SQL database with rich table indexes.', benefits: 'Strict ACID compliance, secure transactions management.' },
    { name: 'React Native', category: 'mobile', desc: 'Cross-platform native engine for iOS and Android deployment.', benefits: '80% code share with Web React, native performance.' },
    { name: 'Docker', category: 'cloud', desc: 'Containerization engine packaging apps with core environments.', benefits: 'Immutable local-to-cloud delivery, isolate dependencies.' },
    { name: 'AWS', category: 'cloud', desc: 'Enterprise cloud hosting, EC2 instances, S3, and CloudFront.', benefits: 'Global server replication, high scale, absolute security.' },
    { name: 'DigitalOcean', category: 'cloud', desc: 'Developer cloud platform providing cost-effective VPS droplets.', benefits: 'Simple server scaling, budget-friendly infrastructure.' },
    { name: 'Nginx', category: 'cloud', desc: 'High-speed reverse proxy and load balancer configuration.', benefits: 'SSL handling, rate limiting protection, static caching.' },
    { name: 'PM2', category: 'cloud', desc: 'Process manager keeping node processes running indefinitely.', benefits: 'Automatic restarts on crashes, cluster load-balancing.' }
  ];

  const filteredTech = selectedCategory === 'all'
    ? technologies
    : technologies.filter(t => t.category === selectedCategory);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-3">Our Toolkit</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Enterprise Technology Stack</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          We curate premium tools and systems configurations to deploy digital assets that process transactions securely and load instantly.
        </p>
      </section>

      {/* Categories Filter Tabs */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                selectedCategory === c.id
                  ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of technologies */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/20 dark:bg-slate-900/20 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{tech.category}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2 uppercase tracking-wide">{tech.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{tech.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Core Benefit:</span>
                <span className="block text-xs font-semibold text-slate-800 dark:text-emerald-400 mt-0.5">{tech.benefits}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Architectural Diagram Block */}
        <div className="mt-16 bg-gradient-to-tr from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="h-5 w-5 text-emerald-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Production Server Reference Architecture</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="block font-bold text-emerald-400 text-[10px] uppercase tracking-wider mb-1">User Client</span>
              <p className="text-[10px] text-slate-500">Next.js App Router static pages rendered via Edge CDN.</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="block font-bold text-indigo-400 text-[10px] uppercase tracking-wider mb-1">Reverse Proxy</span>
              <p className="text-[10px] text-slate-500">Nginx SSL termination, rate-limiting & reverse routing.</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="block font-bold text-emerald-400 text-[10px] uppercase tracking-wider mb-1">API Backend</span>
              <p className="text-[10px] text-slate-500">Node/Express apps clustered and managed via PM2.</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="block font-bold text-indigo-400 text-[10px] uppercase tracking-wider mb-1">Storage Layer</span>
              <p className="text-[10px] text-slate-500">PostgreSQL indices or replica sets in MongoDB Atlas.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

