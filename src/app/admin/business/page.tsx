'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  BadgePercent, 
  ArrowUpRight,
  Download,
  Plus,
  Lock,
  History
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessVault() {
  const [activeTab, setActiveTab] = useState<'vault' | 'clients' | 'pricing'>('vault');
  const [docs, setDocs] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Define Template Categories
  const templates = [
    { title: 'Master Service Agreement', type: 'Legal', slug: 'msa', color: 'text-blue-500' },
    { title: 'Service Delivery (SDA)', type: 'Operations', slug: 'sda', color: 'text-emerald-500' },
    { title: 'Maintenance & SLA', type: 'Recurring', slug: 'sla', color: 'text-amber-500' },
    { title: 'Discovery Assessment', type: 'Discovery', slug: 'discovery', color: 'text-purple-500' },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [docsRes, clientsRes] = await Promise.all([
        supabase.from('business_docs').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('*, client_updates(*)').order('created_at', { ascending: false })
      ]);
      
      if (docsRes.data) setDocs(docsRes.data);
      if (clientsRes.data) setClients(clientsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-12 animate-fade-up pb-20">
      <div className="flex justify-between items-end border-b border-surface-border pb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-text-primary flex items-center gap-3 lowercase tabular-nums">
             <Briefcase className="text-accent" /> business registry
          </h2>
          <p className="text-text-secondary text-sm font-medium italic">Operational governance & strategic intelligence hub.</p>
        </div>
        <div className="flex gap-4">
           {activeTab === 'clients' && (
             <button className="btn-primary">
                <Plus size={16} /> Add Partner
             </button>
           )}
           <button className="flex items-center gap-2 px-4 py-2 bg-surface-light border border-surface-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface transition-colors shadow-sm">
              <History size={14} /> Audit History
           </button>
        </div>
      </div>

      {/* Navigation Switchers */}
      <div className="flex gap-2 p-1 bg-surface-light border border-surface-border rounded-xl w-fit">
        {[
          { icon: <ShieldCheck size={14} />, id: 'vault', label: 'the vault' },
          { icon: <Users size={14} />, id: 'clients', label: 'client base' },
          { icon: <BadgePercent size={14} />, id: 'pricing', label: 'pricing' }
        ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-[0_4px_20px_rgba(var(--accent-rgb),0.3)] scale-[1.02]' : 'text-text-muted hover:text-text-primary whitespace-nowrap'}`}
           >
             {tab.icon} {tab.label}
           </button>
        ))}
      </div>

      {activeTab === 'vault' && (
        <div className="space-y-12">
          {/* Templates Quick-Start */}
          <div className="grid md:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.slug} className="card p-6 glow-border group cursor-pointer hover:border-accent/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl bg-surface-light border border-surface-border ${template.color}`}>
                      <FileText size={20} />
                    </div>
                </div>
                <h3 className="font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{template.title}</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted">{template.type}</p>
              </div>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
               <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-text-muted">
                 <Lock size={16} className="text-blue-500" /> Active Service Agreements
               </h3>
               {loading ? (
                 <div className="py-12 text-center animate-pulse uppercase tracking-widest text-[10px] font-bold">Verifying Vault Integrity...</div>
               ) : docs.length === 0 ? (
                 <div className="card p-12 text-center border-dashed flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-text-muted border border-surface-border"><Lock size={20} /></div>
                    <p className="text-xs text-text-muted">No contracts currently in the vault.</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                    {/* Render Docs */}
                 </div>
               )}
            </div>
            {/* Sidebar for Vault */}
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-8">
           <div className="grid md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 py-20 text-center animate-pulse uppercase tracking-widest text-[10px] font-bold">Informing Client Intelligence...</div>
              ) : clients.length === 0 ? (
                <div className="col-span-3 card p-20 text-center border-dashed">
                   <p className="text-sm font-bold opacity-50">No clients in the repository. Start recording engagements.</p>
                </div>
              ) : (
                 clients.map(client => (
                   <div key={client.id} className="card p-6 glow-border group relative overflow-hidden">
                      {/* Health Indicator */}
                      <div className={`absolute top-0 right-0 w-1.5 h-full ${client.project_health === 'Good' ? 'bg-emerald-500' : client.project_health === 'At-Risk' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{client.name}</h3>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted">{client.industry}</p>
                         </div>
                         <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-surface-light text-text-muted border-surface-border border'}`}>
                            {client.status}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-xs">
                            <span className="text-text-secondary font-medium italic">Project:</span>
                            <span className="font-bold text-text-primary capitalize">{client.current_project || 'None'}</span>
                         </div>
                         
                         <div className="pt-4 border-t border-surface-border">
                            <div className="text-[10px] font-bold uppercase text-text-muted mb-2 flex justify-between">
                               <span>Latest Update</span>
                               <span className="text-text-muted italic">{client.client_updates?.[0]?.created_at ? new Date(client.client_updates[0].created_at).toLocaleDateString() : 'No History'}</span>
                            </div>
                            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                               {client.client_updates?.[0]?.content || 'No engagement history recorded yet for this partner.'}
                            </p>
                         </div>

                         {client.project_health === 'Blocked' && (
                           <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Active Blocker Detected</span>
                           </div>
                         )}
                      </div>
                   </div>
                 ))
              )}
           </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
           <div className="card p-8 glow-border space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-text-primary">
                <BadgePercent size={18} className="text-accent" /> Implementation Registry
              </h3>
              <div className="divide-y divide-surface-border">
                {[
                  { label: 'High-End Custom Web-App', price: '₱1.5M - ₱3M', details: 'Full Next.js ecosystem with custom AI integration.' },
                  { label: 'Institutional Power-App', price: '₱450k - ₱850k', details: 'M365 stack for internal record management.' },
                  { label: 'AI Agent Deployment', price: '₱750k+', details: 'Domain-trained autonomous assistants.' },
                  { label: 'Hourly Strategy Rate', price: '₱3,500', details: 'Senior software architectural consultancy.' }
                ].map((p, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0 group">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{p.label}</span>
                       <span className="text-xs font-mono font-bold text-accent">{p.price}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{p.details}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
