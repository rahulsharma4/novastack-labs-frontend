'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, Award, Users, Rocket, Cpu } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: '99.99%', label: 'Systems Uptime' },
    { value: '45+', label: 'Delivered Projects' },
    { value: '$12M+', label: 'Client Revenue Generated' },
    { value: '15+', label: 'Global Industry Domains' }
  ];

  const trustedCompanies = [
    'Aura Retail', 'MediCare Inc.', 'Zenith Comm', 'FleetTrack', 'EstateHQ', 'IndusManufacturing'
  ];

  const benefits = [
    { title: 'Premium Code Quality', desc: 'We write clean, modular JavaScript strictly separated by concern to facilitate seamless scaling and zero technical debt.', icon: ShieldCheck },
    { title: 'Direct Senior Architect Access', desc: 'No project managers diluting instructions. You collaborate directly with our lead software architects throughout construction.', icon: Cpu },
    { title: 'Guaranteed 95+ Core Web Vitals', desc: 'We optimize largest contentful paints, layout shifts, and bundle loading times to guarantee high search positions.', icon: Rocket },
    { title: 'Global Delivery Model', desc: 'Our team operates asynchronously across time zones to secure continuous development cycles and fast delivery times.', icon: Users }
  ];

  const faqs = [
    { q: 'How long does a typical software project take?', a: 'Simple marketing websites take 3-4 weeks. Complex enterprise CRM/ERP solutions or SaaS systems take 2-4 months depending on functional complexity and user integration requirements.' },
    { q: 'Do you offer custom hosting and post-launch maintenance plans?', a: 'Yes. We build Docker configurations and set up VPS hosting instances on AWS or DigitalOcean. We also offer 24/7 priority support, package updates, and database indexing optimizations.' },
    { q: 'Will we own the intellectual property and code repository?', a: 'Absolutely. Upon project completion, full ownership of the GitHub repository, files, and intellectual property is transferred directly to your organization.' },
    { q: 'Can you integrate AI agents or LLMs into our existing applications?', a: 'Yes. We specialize in mapping API streams, creating vector database indexes (MongoDB/pgvector), and training semantic search models to automate support operations.' }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-emerald-500/15 blur-3xl"></div>
        <div className="absolute top-[400px] -left-[200px] w-[400px] h-[400px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" /> High-Performance Engineering
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Build Digital Products <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400">That Scale</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Custom Web, Mobile, SaaS, and Enterprise solutions. We build software with guaranteed speed, luxury UI/UX layout, and clean architectures.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 via-indigo-650 to-emerald-500 hover:scale-[1.02] shadow-lg shadow-indigo-500/15 transition-all duration-200"
            >
              Book Free Consultation
            </a>
            <a
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200"
            >
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Trusted Logos Section */}
      <section className="relative z-10 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Trusted By Progressive Brands Worldwide</span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 dark:opacity-40">
            {trustedCompanies.map((c) => (
              <span key={c} className="text-sm font-extrabold tracking-wider text-slate-800 dark:text-white font-mono">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Our Core Engineering Capabilities</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            From SaaS development to HIPAA compliance pipelines, we build custom solutions tailored for business scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="group border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl backdrop-blur-sm hover:border-emerald-500/50 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 text-indigo-500 dark:text-emerald-400 font-bold group-hover:scale-105 transition-transform duration-300">
                  {service.title[0]}
                </div>
                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>
              <a
                href={`/services#${service.id}`}
                className="mt-6 flex items-center gap-1 text-[10px] font-bold text-indigo-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform uppercase tracking-wider"
              >
                Learn More <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-y border-slate-100 dark:border-slate-900 py-16 px-6 bg-slate-50/20 dark:bg-slate-900/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-400">{s.value}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Case Studies: Projects in Production</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Read how we assist global businesses in launching secure cloud systems and fast headless storefronts.
            </p>
          </div>
          <a
            href="/portfolio"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white border-b border-slate-900 dark:border-white pb-1 tracking-wider uppercase hover:text-emerald-400 dark:hover:text-emerald-400 hover:border-emerald-400 transition-colors"
          >
            All Case Studies <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="group border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{project.category}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-3">{project.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400">{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
                  <div>
                    <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{Object.values(project.metrics)[0]}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">{Object.keys(project.metrics)[0]}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{Object.values(project.metrics)[1]}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">{Object.keys(project.metrics)[1]}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{Object.values(project.metrics)[2]}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">{Object.keys(project.metrics)[2]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 border-t border-slate-100 dark:border-slate-900 py-20 px-6 bg-slate-50/10 dark:bg-slate-900/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="max-w-xs">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">Our Core Principles</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Why Global Teams Trust NovaStack Labs</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We skip standard template development entirely. We design bespoke systems engineered to resolve business friction points.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <b.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">{b.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
            Have questions about project cycles or intellectual properties? Here are our standard responses.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/30 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-550 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-10">
        <div className="bg-gradient-to-r from-indigo-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">Ready to Build Your Digital Product?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            Book a free 30-minute workspace design meeting. We will discuss your technology requirements, database models, and provide a detailed price proposal.
          </p>
          <a
            href="/contact"
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-emerald-400 hover:scale-[1.02] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/10"
          >
            Book Free Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
