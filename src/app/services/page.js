'use client';

import React from 'react';
import { servicesData } from '../../data/servicesData';
import { ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-indigo-550 dark:text-emerald-400 uppercase tracking-widest block mb-3">Our Offerings</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Core Software Capabilities</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Explore our suite of scalable development solutions designed to accelerate brand growth and automate operational friction.
        </p>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-20 p-6 border border-slate-200 dark:border-slate-850 rounded-3xl bg-slate-50/20 dark:bg-slate-900/20 flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white uppercase tracking-wider">{s.title}</h3>
                  <span className="text-[9px] font-extrabold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Premium Service</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {s.longDesc}
                </p>

                {/* Grid of features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-350">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Architecture Info */}
                <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white uppercase tracking-wide text-[10px] mb-1">
                    <Cpu className="h-3.5 w-3.5 text-indigo-500" /> Target Architecture:
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.architecture}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-850">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Business Impact:</span>
                  <span className="block text-xs font-bold text-slate-800 dark:text-white">{s.benefits}</span>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
                >
                  Consult Now <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
