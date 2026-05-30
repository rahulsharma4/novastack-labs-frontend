'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, LogIn, Mail, FolderHeart, FileText, Trash2, Send, 
  Plus, Briefcase, BookOpen, Layers, Search, Eye, Edit, X, Image, 
  Settings, Users, Globe, CreditCard, ShoppingBag, LogOut, CheckSquare, Square
} from 'lucide-react';

export default function Admin() {
  const [passcode, setPasscode] = useState('');
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('blogs');
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Any');
  const fileInputRef = useRef(null);

  // Lists
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal Control
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('visual');

  // Categories list
  const categoriesList = [
    "Web Development",
    "Databases",
    "DevOps",
    "UI/UX Design",
    "Healthcare Technology",
    "SEO Optimization",
    "Mobile Development",
    "AI Integration",
    "Web Monitoring",
    "test",
    "test 1"
  ];

  // New Blog form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    status: 'Published',
    category: 'Web Development',
    summary: '',
    content: '',
    cssContent: '',
    imageUrl: '',
    author: 'Elena Rostova',
    role: 'Lead Frontend Architect',
    tags: 'webdev, react, tailwind',
    readTime: '5 min read'
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch all listings when token is verified so sidebar counts are populated instantly
  useEffect(() => {
    if (!token) return;
    fetchContacts();
    fetchApplications();
    fetchBlogs();
  }, [token]);

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
      setAuthError('Could not verify. Ensure backend server is running.');
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

  const handleTitleChange = (val) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setNewBlog({ ...newBlog, title: val, slug });
  };

  // Convert selected file to base64 string
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBlog({ ...newBlog, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) {
      alert("Please fill in Title and Summary.");
      return;
    }
    setSubmitting(true);
    try {
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
          slug: '',
          status: 'Published',
          category: 'Web Development',
          summary: '',
          content: '',
          cssContent: '',
          imageUrl: '',
          author: 'Elena Rostova',
          role: 'Lead Frontend Architect',
          tags: 'webdev, react, tailwind',
          readTime: '5 min read'
        });
        setCreateModalOpen(false);
        fetchBlogs();
      } else {
        const errorData = await res.json();
        alert("Failed to create blog: " + errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while publishing.");
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

  const handleDeleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact inquiry?')) return;
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!confirm('Are you sure you want to delete this candidate application log?')) return;
    try {
      const res = await fetch(`${API_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        setApplications(applications.filter(a => a._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Any' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Screen Render
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

  // Dashboard Layout with Clean Sidebar
  return (
    <div className="flex-1 min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* 1. Cleaned Sidebar Nav (Only active functional links remaining) */}
      <aside className="w-full md:w-60 bg-slate-900 text-slate-400 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-sm">NS</div>
          <span className="font-extrabold text-sm text-white tracking-wide uppercase">W3 SpeedX</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1.5 text-xs font-medium">
          <button 
            onClick={() => setActiveTab('blogs')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'blogs' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <BookOpen className="h-4 w-4" /> Website Blogs
          </button>
          <button 
            onClick={() => setActiveTab('contacts')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'contacts' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Mail className="h-4 w-4" /> Contact Inbox ({contacts.length})
          </button>
          <button 
            onClick={() => setActiveTab('applications')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'applications' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Briefcase className="h-4 w-4" /> Careers Applications ({applications.length})
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-rose-400 transition-all text-xs font-semibold text-left">
            <LogOut className="h-4 w-4 text-rose-500" /> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main content area */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 max-w-7xl">
        
        {/* Welcome Top Banner */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Welcome Admin!</h2>
            <p className="text-xs text-slate-500">Here's what's happening with your site today.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-800">Admin Panel</span>
              <span className="block text-[10px] text-slate-400">admin@novastack.com</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-300 overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Dynamic Inner Tab View */}
        {activeTab === 'contacts' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Contact Inquiries Inbox</h3>
            {contacts.length === 0 ? (
              <div className="text-center py-20 text-slate-400 text-xs">No customer inquiries logged yet.</div>
            ) : (
              contacts.map((c) => (
                <div key={c._id} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{c.name}</h4>
                      <span className="text-[10px] text-slate-400">{c.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteContact(c._id)}
                        className="p-1 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-xl mt-2">
                    <strong>Subject: {c.subject}</strong><br />
                    {c.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Careers Candidate Logs</h3>
            {applications.length === 0 ? (
              <div className="text-center py-20 text-slate-400 text-xs">No candidate applications logged yet.</div>
            ) : (
              applications.map((app) => (
                <div key={app._id} className="p-5 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{app.name} ({app.jobTitle})</h4>
                    <span className="text-[10px] text-slate-400">{app.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={app.resume} target="_blank" rel="noreferrer" className="px-4 py-2 border text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors">
                      View Resume
                    </a>
                    <button
                      onClick={() => handleDeleteApplication(app._id)}
                      className="p-2 border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-xl transition-colors"
                      title="Delete Application log"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
            
            {/* Header with Title and Create Button */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website blogs</span>
                <h3 className="text-md font-extrabold text-slate-900 mt-0.5">Blog content</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage blog posts for the public website.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">{filteredBlogs.length} total</span>
                <button 
                  onClick={() => setCreateModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="h-4 w-4" /> Create
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Title, slug..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Any">Any</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button 
                onClick={fetchBlogs}
                className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>

            {/* Table list */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-slate-900 text-white text-[9px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-bold">ID</th>
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Slug</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Updated</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-400">No blog posts found.</td>
                    </tr>
                  ) : (
                    filteredBlogs.map((b, idx) => (
                      <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono text-slate-400 font-bold">{idx + 1}</td>
                        <td className="p-4 font-bold text-slate-800 max-w-[200px] truncate">{b.title}</td>
                        <td className="p-4 font-mono text-slate-500 max-w-[150px] truncate">{b.slug || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                            b.status === 'Draft' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {b.status || 'Published'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono">{b.date}</td>
                        <td className="p-4 text-right flex items-center justify-end gap-1.5">
                          <a href="/blog" className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-500 flex items-center gap-1 font-bold tracking-wider text-[9px] uppercase">
                            <Eye className="h-3.5 w-3.5" /> View
                          </a>
                          <button onClick={() => handleDeleteBlog(b._id)} className="p-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-rose-500 flex items-center gap-1 font-bold tracking-wider text-[9px] uppercase">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>

      {/* 3. Create Blog Popup Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Website Editor</span>
                <h3 className="text-md font-extrabold text-slate-900">Create blog</h3>
              </div>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handlePublishBlog} className="p-6 overflow-y-auto flex flex-col gap-5 text-xs">
              
              {/* Row 1: Title & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Title *</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="My first post"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
                  <select
                    value={newBlog.status}
                    onChange={(e) => setNewBlog({ ...newBlog, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Slug */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Slug *</label>
                <input
                  type="text"
                  required
                  value={newBlog.slug}
                  onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                  placeholder="my-first-post"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
                <span className="text-[9px] text-slate-400 mt-1 block">Allowed: a-z, 0-9, and single -. Example: my-first-post</span>
              </div>

              {/* Row 3: Excerpt */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Excerpt (Teaser Summary) *</label>
                <textarea
                  required
                  rows={2}
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  placeholder="Short teaser description of the blog post..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Row 4: Categories Checkboxes */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Categories Selection</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-slate-150 rounded-2xl bg-slate-50/50">
                  {categoriesList.map((cat) => {
                    const isSelected = newBlog.category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewBlog({ ...newBlog, category: cat })}
                        className="flex items-center gap-2 text-left focus:outline-none group text-slate-600 hover:text-slate-900"
                      >
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
                        )}
                        <span className="text-[11px] font-medium leading-none">{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Editor visual/html/css/preview tabs */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden mt-2">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Body content editor</span>
                  <div className="flex bg-slate-200 p-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                    {['visual', 'html', 'css', 'preview'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setEditorTab(tab)}
                        className={`px-3 py-1.5 rounded-md transition-colors ${
                          editorTab === tab ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                  {editorTab === 'visual' && (
                    <div className="flex flex-col gap-2">
                      <div className="border border-slate-200 rounded-xl bg-slate-50 p-2 flex gap-1 items-center mb-1 text-[9px] font-bold text-slate-400">
                        <span>Paragraph</span>
                        <span>|</span>
                        <span className="font-serif font-bold">B</span>
                        <span className="italic">I</span>
                        <span className="underline">U</span>
                        <span className="line-through">S</span>
                      </div>
                      <textarea
                        rows={6}
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        placeholder="Write dynamic content details here..."
                        className="w-full border border-slate-100 rounded-xl p-3 text-xs focus:outline-none resize-none font-sans"
                      />
                    </div>
                  )}

                  {editorTab === 'html' && (
                    <textarea
                      rows={8}
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      placeholder="<!-- Enter HTML source code -->&#10;<div class='custom-blog-post'>&#10;  <h3>Dynamic Header</h3>&#10;</div>"
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none font-mono resize-none bg-slate-950 text-emerald-400"
                    />
                  )}

                  {editorTab === 'css' && (
                    <textarea
                      rows={8}
                      value={newBlog.cssContent}
                      onChange={(e) => setNewBlog({ ...newBlog, cssContent: e.target.value })}
                      placeholder="/* Enter custom styles scoped to this article */&#10;.custom-blog-post h3 {&#10;  color: #6366f1;&#10;}"
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none font-mono resize-none bg-slate-950 text-indigo-400"
                    />
                  )}

                  {editorTab === 'preview' && (
                    <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs leading-relaxed max-h-[300px] overflow-y-auto">
                      {newBlog.cssContent && (
                        <style dangerouslySetInnerHTML={{ __html: newBlog.cssContent }} />
                      )}
                      {newBlog.content ? (
                        <div dangerouslySetInnerHTML={{ __html: newBlog.content }} />
                      ) : (
                        <span className="text-slate-400 italic">No content written yet. Switch to Visual or HTML tab to edit content.</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 6: Real Image Upload File Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">FEATURED IMAGE URL</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={newBlog.imageUrl}
                        onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm shrink-0"
                    >
                      UPLOAD
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    {newBlog.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setNewBlog({ ...newBlog, imageUrl: '' })}
                        className="px-3 border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-xl shrink-0"
                        title="Clear image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {newBlog.imageUrl && (
                    <div className="mt-2 h-20 w-32 border border-slate-200 rounded-lg overflow-hidden shrink-0 shadow-sm relative group">
                      <img src={newBlog.imageUrl} alt="preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Author Details</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      placeholder="Elena Rostova"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={newBlog.readTime}
                      onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 mt-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98]"
                >
                  {submitting ? 'Creating...' : 'Create'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
