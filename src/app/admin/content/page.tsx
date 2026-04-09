'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'experience' | 'achievements' | 'events'>('experience');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    let query = supabase.from(activeTab).select('*');
    
    if (activeTab === 'experience') query = query.order('order_index', { ascending: true });
    else if (activeTab === 'achievements') query = query.order('year', { ascending: false });
    else query = query.order('date', { ascending: false });

    const { data: result } = await query;
    setData(result || []);
    setLoading(false);
  }

  async function deleteItem(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (!error) setData(data.filter(item => item.id !== id));
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-text-secondary text-sm">Manage your career history and milestones.</p>
        </div>
        <Link href={`/admin/content/new?type=${activeTab}`} className="btn-primary">
          <span>+ Add {activeTab === 'experience' ? 'Position' : activeTab === 'achievements' ? 'Achievement' : 'Event'}</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-surface-light rounded-xl border border-surface-border w-fit">
        <TabButton active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} label="Experience" />
        <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} label="Achievements" />
        <TabButton active={activeTab === 'events'} onClick={() => setActiveTab('events')} label="Events" />
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="card p-20 text-center text-text-muted border-dashed">No items found for {activeTab}.</div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="card p-6 flex items-center justify-between gap-6 glow-border group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center text-xl">
                  {activeTab === 'experience' ? '🏢' : activeTab === 'achievements' ? '🏆' : '📅'}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors">
                    {activeTab === 'experience' ? item.role : item.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold">
                    {activeTab === 'experience' ? item.company : activeTab === 'achievements' ? item.year : item.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link 
                  href={`/admin/content/${item.id}?type=${activeTab}`}
                  className="p-2 hover:bg-accent/10 text-text-muted hover:text-accent rounded-lg transition-colors"
                >
                  ✏️
                </Link>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-500 rounded-lg transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
        active ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  );
}
