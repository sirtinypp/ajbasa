'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { portfolioData } from '../../lib/portfolio-data';

export default function MigratePage() {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const handleMigration = async () => {
    if (!confirm('This will push all data from portfolio-data.ts to Supabase. Continue?')) return;
    
    setStatus('migrating');
    setLogs([]);
    addLog('Starting migration...');

    try {
      // 1. Migrate Identity, Hero, About, Skills to site_configs
      addLog('Migrating site configurations...');
      const configs = [
        { key: 'identity', data: portfolioData.identity },
        { key: 'hero', data: portfolioData.hero },
        { key: 'about', data: portfolioData.about },
        { key: 'skills', data: portfolioData.skills },
      ];

      for (const config of configs) {
        const { error } = await supabase.from('site_configs').upsert(config);
        if (error) throw new Error(`Config error (${config.key}): ${error.message}`);
      }
      addLog('✓ Site configurations migrated.');

      // 2. Migrate Projects
      addLog('Migrating projects...');
      const projectData = portfolioData.projects.map(p => ({
        slug: p.slug,
        title: p.title,
        role: p.role,
        description: p.description,
        long_description: p.longDescription,
        features: p.features,
        impact: p.impact,
        tags: p.tags,
        color: p.color,
        icon: p.icon,
        link: p.link,
        thumbnail: p.thumbnail,
        category: p.category
      }));
      
      const { error: pError } = await supabase.from('projects').upsert(projectData, { onConflict: 'slug' });
      if (pError) throw new Error(`Projects error: ${pError.message}`);
      addLog(`✓ ${projectData.length} projects migrated.`);

      // 3. Migrate Experience
      addLog('Clearing and migrating experience...');
      await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Clear all
      
      const experienceData = portfolioData.experience.map((e, index) => ({
        role: e.role,
        company: e.company,
        period: e.period,
        description: e.description,
        highlights: e.highlights,
        order_index: index
      }));
      
      const { error: eError } = await supabase.from('experience').insert(experienceData);
      if (eError) throw new Error(`Experience error: ${eError.message}`);
      addLog(`✓ ${experienceData.length} experience entries migrated.`);

      // 4. Migrate Achievements
      addLog('Clearing and migrating achievements...');
      await supabase.from('achievements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      const achievementData = portfolioData.achievements.map(a => ({
        title: a.title,
        year: a.year,
        description: a.description,
        icon: a.icon
      }));
      
      const { error: aError } = await supabase.from('achievements').insert(achievementData);
      if (aError) throw new Error(`Achievements error: ${aError.message}`);
      addLog(`✓ ${achievementData.length} achievements migrated.`);

      // 5. Migrate Events
      addLog('Clearing and migrating events...');
      await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      const eventData = portfolioData.events.map(ev => ({
        title: ev.title,
        date: ev.date,
        description: ev.description,
        category: ev.category
      }));
      
      const { error: evError } = await supabase.from('events').insert(eventData);
      if (evError) throw new Error(`Events error: ${evError.message}`);
      addLog(`✓ ${eventData.length} events migrated.`);

      addLog('🚀 Migration completed successfully!');
      setStatus('success');
    } catch (err: any) {
      addLog(`❌ ERROR: ${err.message}`);
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="card p-8 glow-border">
        <h1 className="text-3xl font-bold mb-4">Database Migration Tool</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          This tool will take all the content currently hardcoded in your <code className="text-accent underline">portfolio-data.ts</code> file 
          and push it into your Supabase Postgres database. This is a one-time operation to initialize your CMS.
        </p>

        <div className="flex items-center gap-6 mb-12">
          <button
            onClick={handleMigration}
            disabled={status === 'migrating' || status === 'success'}
            className={`btn-primary px-10 py-4 text-lg ${status === 'migrating' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{status === 'migrating' ? 'Migrating Data...' : status === 'success' ? 'Migration Complete!' : 'Start Full Migration'}</span>
          </button>
          
          {status === 'success' && (
            <button 
              onClick={() => window.location.href = '/admin'}
              className="btn-outline"
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Console Log */}
        <div className="bg-black/40 rounded-xl p-6 font-mono text-sm border border-surface-border min-h-[300px]">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-2 text-text-muted text-[10px] uppercase tracking-widest font-bold">Migration Console</span>
          </div>
          
          <div className="space-y-2">
            {logs.length === 0 && <p className="text-text-muted italic">Ready to transform your data...</p>}
            {logs.map((log, i) => (
              <p key={i} className={log.includes('❌') ? 'text-red-400' : log.includes('✓') ? 'text-green-400' : 'text-text-secondary'}>
                {log}
              </p>
            ))}
            {status === 'migrating' && (
              <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1 align-middle" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
