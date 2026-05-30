'use client';

import React from 'react';
import { Target, Users, Shield, Award, Heart, Eye } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'Absolute Integrity', desc: 'We deliver transparent communications, audit-ready secure code, and strictly honor client timelines.', icon: Shield },
    { title: 'Craftsmanship', desc: 'We treat coding as high art. We avoid lazy template work and structure components to scale cleanly.', icon: Award },
    { title: 'Client Centricity', desc: 'We construct digital platforms mapped directly to client revenue growth and operational automation.', icon: Heart },
    { title: 'Forward Vision', desc: 'We continuous search and implement next-gen cloud structures and AI tooling to keep clients ahead.', icon: Eye }
  ];

  const leaders = [
    { name: 'Elena Rostova', role: 'Founder & Chief Architect', desc: 'Former Lead Engineer at Stripe, Elena directs our frontend styling systems and architectural designs.' },
    { name: 'Rahul Bhardwaj', role: 'Head of Systems & Backend', desc: 'Specializing in secure databases, Rahul coordinates database index clusters and microservice deployments.' },
    { name: 'Marcus Chen', role: 'Director of DevOps', desc: 'Marcus organizes our automated Docker pipelines, Nginx proxies, and secure VPS hosting environments.' },
    { name: 'Sofia Loren', role: 'Lead of Interactive Design', desc: 'Sofia defines the premium design language, custom cursors, and visual palettes at NovaStack Labs.' }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-[300px] -left-[150px] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      {/* Header Banner */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-3">Our Identity</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Architecting Modern Systems</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          We are a premium team of visual designers and software engineers constructing scale-independent digital assets for brands globally.
        </p>
      </section>

      {/* Corporate Story */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Our Origins</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              NovaStack Labs was founded to fill a gap: client frustration with template-heavy development agencies who deliver bloated, slow codebases. 
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We started as a group of senior software architects. Today, we remain an engineering-led agency focused on technical quality, design craftsmanship, and server performance.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Our Mission</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To build high-performance web products that scale smoothly, automate operational workflows, and empower brands to lead.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Our Vision</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To be the global benchmark for custom software development, where startups and enterprise companies go for elite engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Our Operating Values</h2>
          <p className="text-xs text-slate-500 leading-relaxed">The guiding principles underpinning our engineering lifecycle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/30">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <v.icon className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">{v.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Our Systems Architects</h2>
          <p className="text-xs text-slate-500 leading-relaxed">The senior engineers coordinating the design and deployment workflows.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((l) => (
            <div key={l.name} className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:border-indigo-500/40 transition-colors">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{l.name}</h4>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mt-1 mb-3">{l.role}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

