'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'discovery'>('general');

  const fetchInquiries = useCallback(async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const filteredInquiries = inquiries.filter(iq => {
    const isDiscovery = iq.subject?.includes('[DISCOVERY]');
    return activeTab === 'discovery' ? isDiscovery : !isDiscovery;
  });

  async function markAsRead(id: string) {
    await supabase.from('inquiries').update({ is_read: true }).eq('id', id);
    setInquiries(inquiries.map(iq => iq.id === id ? { ...iq, is_read: true } : iq));
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Are you sure?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries(inquiries.filter(iq => iq.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div className="space-y-6 h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div className="flex gap-8">
          <button 
            onClick={() => { setActiveTab('general'); setSelected(null); }}
            className={`text-sm font-bold uppercase tracking-widest pb-4 transition-all relative ${activeTab === 'general' ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          >
            General Messages
            {activeTab === 'general' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
          <button 
            onClick={() => { setActiveTab('discovery'); setSelected(null); }}
            className={`text-sm font-bold uppercase tracking-widest pb-4 transition-all relative ${activeTab === 'discovery' ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          >
            Project Discovery
            {inquiries.filter(iq => iq.subject?.includes('[DISCOVERY]') && !iq.is_read).length > 0 && (
              <span className="absolute -top-1 -right-4 w-2 h-2 bg-accent rounded-full animate-pulse" />
            )}
            {activeTab === 'discovery' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        </div>
        <div className="text-xs text-text-muted font-medium bg-surface-light px-3 py-1 rounded-full border border-surface-border">
          {inquiries.filter(iq => !iq.is_read).length} Unread Total
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {/* List */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-20">
          {loading ? (
            <div className="p-20 text-center animate-pulse">Loading Inbox...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="card p-12 text-center text-text-muted border-dashed border-2">
              No {activeTab} inquiries found.
            </div>
          ) : (
            filteredInquiries.map((iq) => (
              <div
                key={iq.id}
                onClick={() => { setSelected(iq); if (!iq.is_read) markAsRead(iq.id); }}
                className={`card p-5 cursor-pointer transition-all border-l-4 ${
                  selected?.id === iq.id ? 'bg-accent/5 border-accent' : iq.is_read ? 'border-surface-border' : 'border-accent-light bg-accent/5'
                } hover:border-accent group relative overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-text-primary group-hover:text-accent transition-colors">
                    {iq.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted">
                    {new Date(iq.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-text-secondary truncate font-medium">
                  {iq.subject?.replace('[DISCOVERY] ', '') || '(No Subject)'}
                </div>
                {!iq.is_read && <div className="absolute top-0 right-0 w-12 h-12 bg-accent/10 -mr-6 -mt-6 rotate-45" />}
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="h-full pb-20">
          {selected ? (
            <div className="card h-full flex flex-col glow-border animate-fade-up overflow-hidden">
               <div className="p-8 border-b border-surface-border bg-surface/50">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${activeTab === 'discovery' ? 'bg-accent/20 text-accent' : 'bg-surface-border text-text-muted'}`}>
                      {activeTab === 'discovery' ? '💎 Project Discovery' : '✉️ General Inquiry'}
                    </span>
                    <button onClick={() => deleteInquiry(selected.id)} className="text-text-muted hover:text-red-500 transition-colors">🗑️</button>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {selected.subject?.replace('[DISCOVERY] ', '') || '(No Subject)'}
                  </h3>
                  <div className="text-sm font-medium">
                    <span className="text-text-secondary">{selected.name}</span>
                    <span className="text-text-muted mx-2">•</span>
                    <a href={`mailto:${selected.email}`} className="text-accent-light hover:underline">{selected.email}</a>
                  </div>
               </div>
               
               <div className="flex-grow overflow-y-auto p-8 bg-black/20">
                  <div className={`leading-relaxed whitespace-pre-wrap ${activeTab === 'discovery' ? 'font-mono text-sm text-text-primary/90 space-y-4' : 'text-lg text-text-secondary'}`}>
                    {selected.message}
                  </div>
               </div>

               <div className="p-6 border-t border-surface-border flex justify-between items-center bg-surface/30">
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">
                    Received {new Date(selected.created_at).toLocaleString()}
                  </span>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary py-2 px-6">
                    <span>Send Reply</span>
                  </a>
               </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-text-muted gap-4 opacity-50 border-dashed border-2">
              <span className="text-5xl">📩</span>
              <p className="font-bold uppercase tracking-widest text-xs">Select a lead to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
