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

  const fetchInquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching inquiries:', error);
    else setInquiries(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from('inquiries')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setInquiries(inquiries.map((iq) => (iq.id === id ? { ...iq, is_read: true } : iq)));
      if (selected?.id === id) setSelected({ ...selected, is_read: true });
    }
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    const { error } = await supabase.from('inquiries').delete().eq('id', id);

    if (!error) {
      setInquiries(inquiries.filter((iq) => iq.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-160px)]">
      {/* List */}
      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📨</span> Inbound Messages
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="card p-12 text-center text-text-muted">
            No inquiries yet.
          </div>
        ) : (
          inquiries.map((iq) => (
            <div
              key={iq.id}
              onClick={() => {
                setSelected(iq);
                if (!iq.is_read) markAsRead(iq.id);
              }}
              className={`card p-5 cursor-pointer transition-all border-l-4 ${
                selected?.id === iq.id
                  ? 'bg-accent/5 border-accent'
                  : iq.is_read
                  ? 'border-surface-border'
                  : 'border-blue-500 bg-blue-500/5'
              } hover:border-accent group`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-text-primary group-hover:text-accent transition-colors">
                  {iq.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted whitespace-nowrap ml-4">
                  {new Date(iq.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="text-xs text-text-secondary truncate font-medium">
                {iq.subject || '(No Subject)'}
              </div>
              <div className="text-xs text-text-muted mt-2 truncate italic">
                &ldquo;{iq.message}&rdquo;
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail */}
      <div className="h-full">
        {selected ? (
          <div className="card p-8 h-full flex flex-col glow-border animate-fade-up">
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-surface-border">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  {selected.subject || '(No Subject)'}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-secondary font-medium">{selected.name}</span>
                  <span className="text-text-muted text-xs">•</span>
                  <a href={`mailto:${selected.email}`} className="text-accent hover:underline font-bold">
                    {selected.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => deleteInquiry(selected.id)}
                className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-500 rounded-lg transition-colors"
                title="Delete Inquiry"
              >
                🗑️
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-4">
              <div className="text-text-secondary leading-relaxed whitespace-pre-wrap text-lg">
                {selected.message}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-surface-border flex justify-between items-center">
              <span className="text-xs text-text-muted italic">
                Received on {new Date(selected.created_at).toLocaleString()}
              </span>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn-primary"
              >
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="card h-full flex flex-col items-center justify-center text-text-muted gap-4 opacity-50 border-dashed">
            <span className="text-5xl">👀</span>
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
