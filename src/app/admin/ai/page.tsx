'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

export default function AIProfileEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>({
    name: 'Portfolio Assistant',
    personality: 'Professional, helpful, and concise digital representative of Aaron.',
    instructions: `## SMART PRESENTATION FRAMEWORK:
1. **Direct Answer**: Start with a single, clear sentence answering the user's intent.
2. **Structured Detail**: If providing lists or projects, use **Markdown tables** or **bullet points** with bold headers. Avoid long paragraphs.
3. **Conversational Hook**: Always end your response with a short, relevant follow-up question to keep the conversation going.

## TONE & STYLE:
- Use a "concise yet warm" professional tone.
- Refer to Aaron in the third person.
- Use **bolding** for keywords and project titles.
- Never dump all information at once; offer to provide more details if the user is interested.`
  });

  const fetchConfig = useCallback(async () => {
    const { data } = await supabase.from('site_configs').select('*').eq('key', 'ai_config').single();
    if (data) {
      setConfig(data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const updateField = (key: string, value: string) => {
    setConfig((prev: any) => ({ ...prev, [key]: value }));
  };

  async function saveConfig() {
    setSaving(true);
    const { error } = await supabase.from('site_configs').upsert({
      key: 'ai_config',
      data: config
    });
    
    setSaving(false);
    if (error) {
      alert('Error saving config: ' + error.message);
    } else {
      alert('AI Profile updated successfully!');
    }
  }

  if (loading) return <div className="p-20 text-center">Loading AI Config...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-up pb-20">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md py-6 mb-8 border-b border-surface-border flex justify-between items-center px-4 -mx-4">
        <div>
          <h2 className="text-3xl font-bold">AI Assistant Profile</h2>
          <p className="text-text-secondary text-sm">Tune your AI&apos;s personality and behavior.</p>
        </div>
        <button 
          onClick={saveConfig} 
          disabled={saving} 
          className="btn-primary min-w-[150px] justify-center"
        >
          {saving ? 'Saving...' : 'Save AI Profile'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>🤖</span> Identity & Personality
            </h3>
            <div className="card p-8 glow-border space-y-6">
              <div>
                <label className="label">Assistant Name</label>
                <input 
                  value={config.name || ''} 
                  onChange={(e) => updateField('name', e.target.value)}
                  className="form-input" 
                  placeholder="e.g. Aaron's Digital Twin"
                />
              </div>
              <div>
                <label className="label">Core Personality</label>
                <textarea 
                  value={config.personality || ''} 
                  onChange={(e) => updateField('personality', e.target.value)}
                  rows={3}
                  className="form-input resize-none" 
                  placeholder="Describe how the AI should act..."
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>📜</span> Detailed Instructions (System Prompt)
            </h3>
            <div className="card p-8 glow-border space-y-6">
              <p className="text-xs text-text-muted italic">These instructions are injected into every conversation. Be specific about formatting and tone.</p>
              <div>
                <label className="label">Rules & Constraints</label>
                <textarea 
                  value={config.instructions || ''} 
                  onChange={(e) => updateField('instructions', e.target.value)}
                  rows={8}
                  className="form-input font-mono text-[10px]" 
                  placeholder="1. Use Markdown... 2. Keep responses short..."
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">Preview</h3>
          <div className="card p-6 border-accent/20 bg-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-bold">{config.name}</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[8px] text-text-muted uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed italic">
              &quot;{config.personality}&quot;
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-light border border-surface-border space-y-3">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Editor Tips</h4>
             <ul className="text-[10px] text-text-secondary space-y-2 list-disc pl-3">
               <li>Tell the AI to keep responses under 2-3 sentences for a snappier feel.</li>
               <li>Remind it to always use Markdown for lists.</li>
               <li>Explicitly forbid it from making up information not in your profile.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
