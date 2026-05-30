'use client';

import { useState } from 'react';
import Logo from './Logo';
import { Send, MapPin, Mail, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${apiBase}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          subject: 'Newsletter Subscription Signup',
          message: `User signed up for insights newsletter using email: ${email}`
        })
      });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Failed to submit subscription:', err);
      setSubscribed(true);
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Technologies', href: '/technologies' },
      { name: 'Careers', href: '/careers' },
    ],
    services: [
      { name: 'Web Apps', href: '/services#web-apps' },
      { name: 'SaaS Platforms', href: '/services#saas-platforms' },
      { name: 'Healthcare', href: '/services#healthcare-solutions' },
      { name: 'Cloud & DevOps', href: '/services#cloud-deployment' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ]
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 px-6 py-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        
        {/* Info Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed mt-2">
            NovaStack Labs is a premium software engineering agency. We architect and deploy high-performance digital products for enterprises, scaling startups, and progressive founders.
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-500" /> New York, NY & New Delhi, India</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-500" /> hello@novastacklabs.com</span>
            <span className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-slate-500" /> +1 (555) 019-2834</span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-[10px] uppercase font-bold text-slate-200 tracking-widest mb-4">Company</h4>
          <div className="flex flex-col gap-2 text-xs">
            {footerLinks.company.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-emerald-400 transition-colors">{link.name}</a>
            ))}
          </div>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-[10px] uppercase font-bold text-slate-200 tracking-widest mb-4">Core Services</h4>
          <div className="flex flex-col gap-2 text-xs">
            {footerLinks.services.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-indigo-400 transition-colors">{link.name}</a>
            ))}
          </div>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-[10px] uppercase font-bold text-slate-200 tracking-widest mb-4">Newsletter</h4>
          <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
            Subscribe to receive our latest insights on technical performance, SaaS scaling, and custom CRM architectures.
          </p>
          {subscribed ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-semibold">
              Thank you for subscribing to our insights newsletter!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600">
        <p>&copy; {new Date().getFullYear()} NovaStack Labs. All rights reserved.</p>
        <div className="flex gap-4">
          {footerLinks.legal.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-slate-400 transition-colors">{link.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

