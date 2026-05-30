'use client';

import { useState } from 'react';
import { useTheme } from './ThemeContext';
import Logo from './Logo';
import SearchModal from './SearchModal';
import { Search, Sun, Moon, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const mainLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Technologies', href: '/technologies' },
    { name: 'Industries', href: '/industries' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 xl:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
            {mainLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setMegaMenuOpen(true)}
                onMouseLeave={() => link.hasDropdown && setMegaMenuOpen(false)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="h-3 w-3" />}
                </a>

                {/* Mega Menu Dropdown */}
                {link.hasDropdown && megaMenuOpen && (
                  <div className="absolute top-4 -left-20 pt-4 w-[480px]">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Custom Products</span>
                        <a href="/services#website-dev" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <span className="text-xs font-bold text-slate-800 block">Websites</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Lighthouse speed optimized pages.</span>
                        </a>
                        <a href="/services#web-apps" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors mt-2">
                          <span className="text-xs font-bold text-slate-800 block">Web Apps</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Scalable dynamic portals.</span>
                        </a>
                        <a href="/services#saas-platforms" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors mt-2">
                          <span className="text-xs font-bold text-slate-800 block">SaaS Platforms</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Multi-tenant subscriptions.</span>
                        </a>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Enterprise Systems</span>
                        <a href="/services#crm-systems" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <span className="text-xs font-bold text-slate-800 block">CRM / ERP Software</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Internal automated pipelines.</span>
                        </a>
                        <a href="/services#ai-integration" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors mt-2">
                          <span className="text-xs font-bold text-slate-800 block flex items-center gap-1">AI Integration <Sparkles className="h-3 w-3 text-emerald-400" /></span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Vector embeddings & LLMs.</span>
                        </a>
                        <a href="/services#react-native-apps" className="block p-2 hover:bg-slate-50 rounded-xl transition-colors mt-2">
                          <span className="text-xs font-bold text-slate-800 block">Mobile Apps</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Native iOS & Android builds.</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Search site"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Main Consultation Button */}
            <a
              href="/contact"
              className="px-4 py-2.5 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-650 hover:to-emerald-600 rounded-xl shadow-md transition-all duration-200"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Drawer Menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm ml-auto bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {mainLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold uppercase tracking-wider text-slate-700 hover:text-emerald-500 dark:text-slate-350 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 block text-center text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
