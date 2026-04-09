'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Database, 
  Monitor, 
  UserCheck, 
  Calendar, 
  Globe, 
  ShoppingCart,
  PlusCircle,
  Search
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'monitoring': return <Monitor size={24} />;
    case 'dtr': return <UserCheck size={24} />;
    case 'event': return <Calendar size={24} />;
    case 'web': return <Globe size={24} />;
    case 'store': return <ShoppingCart size={24} />;
    case 'db': return <Database size={24} />;
    default: return <Zap size={24} />;
  }
};

const CATEGORIES = ['All', 'Enterprise', 'Automation', 'Business Tools', 'Identity'];

export default function SolutionsPage() {
  const [services, setServices] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('site_configs').select('data').eq('key', 'services').single();
      
      const defaultData = [
        { id: 'ams', title: 'Asset Management System', category: 'Enterprise', description: 'Enterprise hardware tracking & lifecycle.', icon: 'db' },
        { id: 'hris', title: 'HR Information & Management', category: 'Enterprise', description: 'Centralized workforce documentation.', icon: 'db' },
        { id: 'lms', title: 'Learning Management System', category: 'Enterprise', description: 'Scalable corporate training platforms.', icon: 'db' },
        { id: 'dtr-face', title: 'DTR with Facial Recognition', category: 'Identity', description: 'Biometric time tracking for security.', icon: 'dtr' },
        { id: 'monitoring', title: 'Operational Monitoring Tools', category: 'Automation', description: 'Real-time infrastructure health tracking.', icon: 'monitoring' },
        { id: 'event-reg', title: 'Automated Event Registration', category: 'Business Tools', description: 'End-to-end event ticketing & management.', icon: 'event' },
        { id: 'virtual-store', title: 'Virtual Store Ecosystem', category: 'Business Tools', description: 'Custom e-commerce with inventory sync.', icon: 'store' },
        { id: 'basic-web', title: 'Professional Web Presence', category: 'Business Tools', description: 'High-performance landing pages.', icon: 'web' },
      ];

      setServices(data?.data && data.data.length > 0 ? data.data : defaultData);
    }
    fetchServices();
  }, []);

  const filtered = services.filter(s => {
    const matchesFilter = filter === 'All' || s.category === filter;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-surface/30">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block"
            >
              Solutions Catalog
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              The <span className="gradient-text">Systems</span> I Build.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg leading-relaxed mb-10"
            >
              From complex enterprise architectures to specialized utility apps. 
              Explore the modules I can implement for your business today.
            </motion.p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Catalog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
             <div className="flex flex-wrap gap-2">
               {CATEGORIES.map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter transition-all ${filter === cat ? 'bg-accent text-white' : 'bg-surface-light text-text-muted hover:text-text-primary order border-surface-border'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>

             <div className="relative w-full md:w-72">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
               <input 
                 type="text" 
                 placeholder="Search systems..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-surface border border-surface-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-accent outline-none transition-all"
               />
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-6 glow-border group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                    {getIcon(s.icon)}
                  </div>
                  <div className="flex-grow">
                     <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 block">{s.category}</span>
                     <h3 className="text-lg font-bold mb-2 group-hover:text-accent-light transition-colors">{s.title}</h3>
                     <p className="text-xs text-text-secondary leading-relaxed mb-6">{s.description}</p>
                  </div>
                  
                  <Link 
                    href={`/services/inquiry/${s.id}`}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors"
                  >
                    Inquire Implementation <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Custom Request Card */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl border-2 border-dashed border-surface-border flex flex-col items-center justify-center text-center space-y-4 group hover:border-accent/40 transition-all bg-surface/10"
            >
              <div className="w-12 h-12 rounded-full bg-surface-light border border-surface-border flex items-center justify-center">
                <PlusCircle size={24} className="text-text-muted group-hover:text-accent transition-colors" />
              </div>
              <h4 className="font-bold text-sm">Need a Custom Tool?</h4>
              <p className="text-[10px] text-text-muted">If you don't see the specific monitoring or automation tool you need, I can architect it from scratch.</p>
              <Link href="/#contact" className="text-xs font-bold text-accent">Start Custom discovery →</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
