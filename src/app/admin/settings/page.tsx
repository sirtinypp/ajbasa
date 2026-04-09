'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configs, setConfigs] = useState<any>({});

  const fetchConfigs = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_configs').select('*');
    const mapped = data?.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.data }), {});
    setConfigs(mapped || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const updateConfig = (key: string, subKey: string, value: any) => {
    setConfigs((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], [subKey]: value }
    }));
  };

  async function saveSettings() {
    setSaving(true);
    const keys = ['identity', 'hero', 'about'];
    
    for (const key of keys) {
      if (configs[key]) {
        await supabase.from('site_configs').upsert({ key, data: configs[key] });
      }
    }
    
    setSaving(false);
    alert('Settings saved successfully!');
  }

  if (loading) return <div className="p-20 text-center">Loading Settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-up pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Site Settings</h2>
          <p className="text-text-secondary">Update your personal identity and core site content.</p>
        </div>
        <button 
          onClick={saveSettings} 
          disabled={saving} 
          className="btn-primary min-w-[150px] justify-center"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Identity Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>👤</span> Identity & Socials
        </h3>
        <div className="card p-8 glow-border grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Full Name</label>
            <input 
              value={configs.identity?.name || ''} 
              onChange={(e) => updateConfig('identity', 'name', e.target.value)}
              className="form-input" 
            />
          </div>
          <div>
            <label className="label">Nickname</label>
            <input 
              value={configs.identity?.nickname || ''} 
              onChange={(e) => updateConfig('identity', 'nickname', e.target.value)}
              className="form-input" 
            />
          </div>
          <div>
            <label className="label">Professional Title</label>
            <input 
              value={configs.identity?.title || ''} 
              onChange={(e) => updateConfig('identity', 'title', e.target.value)}
              className="form-input" 
            />
          </div>
          <div>
            <label className="label">Contact Email</label>
            <input 
              value={configs.identity?.email || ''} 
              onChange={(e) => updateConfig('identity', 'email', e.target.value)}
              className="form-input" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">GitHub Profile URL</label>
            <input 
              value={configs.identity?.github || ''} 
              onChange={(e) => updateConfig('identity', 'github', e.target.value)}
              className="form-input" 
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>✨</span> Hero Section
        </h3>
        <div className="card p-8 glow-border space-y-6">
          <div>
            <label className="label">Short Bio (Hero Text)</label>
            <textarea 
              value={configs.hero?.shortBio || ''} 
              onChange={(e) => updateConfig('hero', 'shortBio', e.target.value)}
              rows={4}
              className="form-input resize-none" 
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>📖</span> Bio Paragraphs
        </h3>
        <div className="card p-8 glow-border space-y-6">
          <p className="text-xs text-text-muted italic mb-4">You can edit the main paragraphs shown in your About section here.</p>
          {configs.about?.paragraphs.map((para: string, i: number) => (
            <div key={i}>
              <label className="label">Paragraph {i + 1}</label>
              <textarea 
                value={para} 
                onChange={(e) => {
                  const newParas = [...configs.about.paragraphs];
                  newParas[i] = e.target.value;
                  updateConfig('about', 'paragraphs', newParas);
                }}
                rows={4}
                className="form-input resize-none" 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
