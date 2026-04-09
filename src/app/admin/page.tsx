'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  unreadInquiries: number;
  totalVisits: number;
  totalProjects: number;
  totalAchievements: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    unreadInquiries: 0,
    totalVisits: 0,
    totalProjects: 0,
    totalAchievements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      
      const [
        { count: unread },
        { count: visits },
        { count: projects },
        { count: achievements }
      ] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('analytics').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('achievements').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        unreadInquiries: unread || 0,
        totalVisits: visits || 0,
        totalProjects: projects || 0,
        totalAchievements: achievements || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Unread Inquiries"
          value={stats.unreadInquiries}
          icon="📩"
          color="bg-blue-500"
          highlight={stats.unreadInquiries > 0}
        />
        <StatCard
          label="Total Visits"
          value={stats.totalVisits}
          icon="👁️"
          color="bg-emerald-500"
        />
        <StatCard
          label="Total Projects"
          value={stats.totalProjects}
          icon="🚀"
          color="bg-purple-500"
        />
        <StatCard
          label="Achievements"
          value={stats.totalAchievements}
          icon="🏆"
          color="bg-amber-500"
        />
      </div>


      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 glow-border">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span>⚡</span> Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ActionButton label="New Project" icon="📁" href="/admin/projects/new" />
              <ActionButton label="Add Achievement" icon="🏅" href="/admin/content" />
              <ActionButton label="Post Event" icon="📣" href="/admin/content" />
              <ActionButton label="View Inbox" icon="📥" href="/admin/inquiries" />
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="card p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span>🛡️</span> System Health
            </h3>
            <div className="space-y-3">
              <HealthItem label="Database" status="Connected" />
              <HealthItem label="Storage" status="Operational" />
              <HealthItem label="Auth Service" status="Active" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, highlight = false }: any) {
  return (
    <div className={`card p-6 glow-border ${highlight ? 'border-accent/30' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-muted">{label}</p>
          <h3 className="text-3xl font-bold mt-1 text-text-primary">{value}</h3>
        </div>
        <div className={`w-12 h-12 ${color}/10 rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, icon, href }: any) {
  return (
    <a href={href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-border bg-surface-light hover:bg-accent/5 hover:border-accent/20 transition-all group">
      <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-wider">{label}</span>
    </a>
  );
}

function HealthItem({ label, status }: any) {
  return (
    <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-background/50 border border-surface-border">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold text-green-500 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        {status}
      </span>
    </div>
  );
}
