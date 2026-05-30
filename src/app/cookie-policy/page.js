import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Cookie Policy</h1>
      
      <p className="mb-4"><strong>Effective Date: June 1, 2026</strong></p>
      
      <p className="mb-6">
        This Cookie Policy details how NovaStack Labs utilizes cookies and session markers to optimize page speeds and improve user navigation metrics.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">1. What are Cookies?</h2>
      <p className="mb-4">
        Cookies are lightweight text files stored on your local browser that save preference states, such as active dark/light mode styles, or search terms cache.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">2. How We Use Cookies</h2>
      <p className="mb-4">
        - **Essential Cookies**: Used to retain theme selections (light/dark mode) and authenticate active session tokens.
        - **Analytics Cookies**: Gather metrics on page views, visitor browser types, and mobile load times to debug layout errors.
      </p>

      <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-6 mb-3">3. Managing Preferences</h2>
      <p className="mb-4">
        You can block or delete cookies in your browser settings. Note that disabling essential cookies may break theme toggles or search modal states.
      </p>
    </div>
  );
}

