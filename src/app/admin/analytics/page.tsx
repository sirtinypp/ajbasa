'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { 
  Users, 
  MousePointer2, 
  Globe, 
  Clock, 
  ArrowUpRight,
  Monitor,
  Smartphone,
  Navigation
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    topPath: '/',
    avgDuration: '2m 14s'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        setLogs(data);
        
        // Simple aggregate calculations
        const uniqueIps = new Set(data.map(l => l.ip_hash)).size;
        const paths = data.map(l => l.path);
        const mostCommonPath = paths.sort((a,b) =>
          paths.filter(v => v===a).length - paths.filter(v => v===b).length
        ).pop();

        setStats({
          totalViews: data.length,
          uniqueVisitors: uniqueIps || data.length, // Fallback if ip_hash isn't unique yet
          topPath: mostCommonPath || '/',
          avgDuration: '2m 45s' // Static placeholder for now
        });
      }
      setLoading(false);
    }

    fetchLogs();
    const subscription = supabase
      .channel('visitor_logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_logs' }, fetchLogs)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-xs font-bold animate-pulse">Initializing Intelligence Feed...</div>;

  return (
    <div className="space-y-12 animate-fade-up pb-20">
      <div className="flex justify-between items-end border-b border-surface-border pb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Traffic Intelligence</h2>
          <p className="text-text-secondary text-sm">Real-time engagement metrics for your solutions catalog.</p>
        </div>
        <div className="flex gap-2 items-center text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Feed Active
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Page Views', value: stats.totalViews, icon: <MousePointer2 size={18} />, color: 'text-accent' },
          { label: 'Unique Visitors', value: stats.uniqueVisitors, icon: <Users size={18} />, color: 'text-blue-500' },
          { label: 'Hot Path', value: stats.topPath, icon: <Navigation size={18} />, color: 'text-purple-500' },
          { label: 'Avg Study Time', value: stats.avgDuration, icon: <Clock size={18} />, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="card p-6 glow-border relative overflow-hidden group">
             <div className="flex justify-between items-start mb-4">
               <div className={`p-2 rounded-lg bg-surface-light border border-surface-border ${stat.color}`}>
                 {stat.icon}
               </div>
               <ArrowUpRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="text-2xl font-bold mb-1 tracking-tighter">{stat.value}</div>
             <div className="text-[10px] uppercase tracking-widest font-bold text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Real-time Logs List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Globe size={16} className="text-accent" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {logs.map((log) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={log.id} 
                className="card p-4 flex items-center justify-between group hover:bg-accent/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-surface-light border border-surface-border flex items-center justify-center text-accent">
                      {log.user_agent.includes('Mobi') ? <Smartphone size={18} /> : <Monitor size={18} />}
                   </div>
                   <div>
                      <div className="text-sm font-bold tracking-tight">
                        Accessed <span className="text-accent">{log.path}</span>
                      </div>
                      <div className="text-[10px] text-text-muted uppercase tracking-tight">
                        from {log.referer} • {new Date(log.created_at).toLocaleTimeString()}
                      </div>
                   </div>
                </div>
                <div className="text-[10px] font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  {new Date(log.created_at).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traffic Sources / Insights */}
        <div className="space-y-6">
           <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Navigation size={16} className="text-accent" /> Conversion Insights
          </h3>
          <div className="card p-6 glow-border space-y-6">
             <div>
                <div className="flex justify-between text-[10px] font-bold uppercase text-text-muted mb-2">
                  <span>Direct Traffic</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-surface-light h-1.5 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[72%]" />
                </div>
             </div>
             <div>
                <div className="flex justify-between text-[10px] font-bold uppercase text-text-muted mb-2">
                  <span>Search Engines</span>
                  <span>18%</span>
                </div>
                <div className="w-full bg-surface-light h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[18%]" />
                </div>
             </div>
             <div>
                <div className="flex justify-between text-[10px] font-bold uppercase text-text-muted mb-2">
                  <span>Social Media</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-surface-light h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[10%]" />
                </div>
             </div>
             
             <div className="pt-6 border-t border-surface-border">
                <p className="text-[10px] text-text-secondary leading-relaxed italic">
                  "Most visitors spend an average of 45 seconds on the HRIS offering page before clicking inquire."
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
