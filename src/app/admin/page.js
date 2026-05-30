'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, LogIn, Mail, FolderHeart, FileText, Trash2, Send, Plus, Briefcase, BookOpen, Layers } from 'lucide-react';

export default function Admin() {
  const [passcode, setPasscode] = useState('');
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('contacts');
  const [submitting, setSubmitting] = useState(false);

  // States for lists
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Blog form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Web Development',
    author: 'Elena Rostova',
    role: 'Lead Frontend Architect',
    summary: '',
    tags: '',
    readTime: '5 min read'
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Check if token exists in session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch data on tab switch
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'contacts') fetchContacts();
    if (activeTab === 'applications') fetchApplications();
    if (activeTab === 'blogs') fetchBlogs();
  }, [token, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError('');
    try {
      const res = await fetch(`${API_URL}/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        sessionStorage.setItem('adminToken', data.token);
      } else {
        setAuthError('Invalid passcode. Access Denied.');
      }
    } catch (err) {
      setAuthError('Could not verify. Ensure backend server is running on port 5000.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setPasscode('');
    sessionStorage.removeItem('adminToken');
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/applications`, {
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) return;
    setSubmitting(true);
    try {
      // Split tags comma
      const tagsArray = newBlog.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({
          ...newBlog,
          tags: tagsArray,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })
        })
      });
      if (res.ok) {
        setNewBlog({
          title: '',
          category: 'Web Development',
          author: 'Elena Rostova',
          role: 'Lead Frontend Architect',
          summary: '',
          tags: '',
          readTime: '5 min read'
        });
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 1. Render Login Screen
  if (!token) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 py-20 px-6">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
          <div className="flex flex-col items-center gap-4 text-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">NovaStack Admin Portal</h2>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Enter your passcode to manage system configurations, reviews, and dynamic content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Passcode PIN</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 text-center tracking-widest"
              />
            </div>

            {authError && (
              <span className="text-[10px] text-rose-500 font-semibold text-center">{authError}</span>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <LogIn className="h-4 w-4" /> {submitting ? 'Verifying...' : 'Unlock Systems'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Render Main Dashboard
  return (
    <div className="flex-1 bg-slate-50 min-h-screen py-10 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">NovaStack Admin Console</h1>
            <p className="text-xs text-slate-500">Dynamic control panel for logs and client inquiries.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Lock Dashboard
          </button>
        </div>

        {/* Dashboard Menu Tabs */}
        <div className="flex border-b border-slate-200 gap-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'contacts' ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Contacts Inquiries ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'applications' ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'blogs' ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Manage Blog ({blogs.length})
          </button>
        </div>

        {/* Dynamic content rendering */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">Loading database records...</div>
          ) : activeTab === 'contacts' ? (
            /* Tab 1: Inquiries */
            <div className="grid grid-cols-1 gap-4">
              {contacts.length === 0 ? (
                <div className="text-center py-20 text-slate-400 text-xs">No client inquiries logged yet.</div>
              ) : (
                contacts.map((c) => (
                  <div key={c._id} className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col gap-3 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{c.name}</h4>
                        <span className="text-[10px] text-slate-500">{c.email}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</span>
                      <h5 className="font-semibold text-slate-800 text-xs mb-2">{c.subject}</h5>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Message</span>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-2xl">{c.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : activeTab === 'applications' ? (
            /* Tab 2: Job Applications */
            <div className="grid grid-cols-1 gap-4">
              {applications.length === 0 ? (
                <div className="text-center py-20 text-slate-400 text-xs">No candidate applications logged yet.</div>
              ) : (
                applications.map((app) => (
                  <div key={app._id} className="p-6 bg-white border border-slate-200 rounded-3xl flex items-center justify-between gap-6 shadow-sm">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-800 text-xs">{app.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">{app.jobTitle}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{app.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        View Resume
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Tab 3: Blog Editor */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form Block */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm h-fit">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5"><Plus className="h-4 w-4 text-emerald-500" /> Publish Article</h3>
                <form onSubmit={handlePublishBlog} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Article Title</label>
                    <input
                      type="text"
                      required
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      placeholder="e.g. Scaling Express Clusters"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-455 uppercase tracking-widest mb-1.5">Category</label>
                    <select
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Databases">Databases</option>
                      <option value="DevOps">DevOps</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Healthcare Technology">Healthcare Technology</option>
                      <option value="SEO Optimization">SEO Optimization</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="AI Integration">AI Integration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-455 uppercase tracking-widest mb-1.5">Summary</label>
                    <textarea
                      required
                      rows={3}
                      value={newBlog.summary}
                      onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                      placeholder="Short teaser description..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-455 uppercase tracking-widest mb-1.5">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={newBlog.tags}
                      onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                      placeholder="e.g. Node, Cluster, API"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                  >
                    Publish Post
                  </button>
                </form>
              </div>

              {/* List Block */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {blogs.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-xs">No blogs found in database.</div>
                ) : (
                  blogs.map((b) => (
                    <div key={b._id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{b.category}</span>
                        <h4 className="font-bold text-slate-800 text-xs truncate mt-0.5">{b.title}</h4>
                        <span className="block text-[9px] text-slate-400 mt-1">{b.date} &bull; {b.author}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b._id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

