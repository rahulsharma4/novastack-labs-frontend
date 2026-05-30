'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Queries' },
    { id: 'general', name: 'General' },
    { id: 'technical', name: 'Technical & DB' },
    { id: 'compliance', name: 'Compliance & Safety' }
  ];

  const faqs = [
    { q: 'Who leads the project development?', category: 'general', a: 'Your project is lead directly by a Senior Systems Architect who handles system designs, database schemas, and coordinates visual requirements.' },
    { q: 'Do you work with existing teams or codebases?', category: 'general', a: 'Yes. We frequently integrate with internal product teams to write specific microservices, redesign frontends, or consult on database optimization architectures.' },
    { q: 'Which database should we choose for our SaaS?', category: 'technical', a: 'We evaluate write/read ratios. MongoDB is ideal for high-volume flexible collections, while PostgreSQL is selected for strict ACID transaction audits.' },
    { q: 'How do you guarantee 95+ Lighthouse scores?', category: 'technical', a: 'We build with Next.js App Router, compress asset assets, lazy load modules, optimize layouts shifts (CLS), and compile lightweight tailwind outputs.' },
    { q: 'Is the clinical software fully HIPAA compliant?', category: 'compliance', a: 'Absolutely. We configure AES-256 database encryption at rest and secure SSL pipelines. We also map strict access logs auditing inside clinical portals.' },
    { q: 'How are client repositories secured during development?', category: 'compliance', a: 'All source files are managed in private GitHub repositories with multi-factor authentication, key permissions, and strict branch protection rules.' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-indigo-550 dark:text-emerald-400 uppercase tracking-widest block mb-3">FAQ Directory</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Search our catalog of responses detailing technical workflows, data security protocols, and payment packages.
        </p>
      </section>

      {/* Categories select tabs */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === c.id
                  ? 'bg-slate-905 dark:bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-550 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-6 mb-20">
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 dark:bg-slate-900/10 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" /> {faq.q}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-405 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-550 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
