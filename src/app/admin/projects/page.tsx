'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  role: string;
  category: string;
  slug: string;
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, role, category, slug')
      .order('created_at', { ascending: false });

    if (!error) setProjects(data || []);
    setLoading(false);
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure? This will permanently delete this project.')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects(projects.filter(p => p.id !== id));
    }
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Project Management</h2>
          <p className="text-text-secondary text-sm">Create, edit, and manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <span>+ New Project</span>
        </Link>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="card p-12 text-center text-text-muted border-dashed">
            No projects found. Start by creating one!
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 glow-border group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-text-primary group-hover:text-accent-light transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-bold">{project.role}</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-light border border-surface-border text-text-secondary uppercase font-bold tracking-tighter">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2.5 hover:bg-accent/10 text-text-muted hover:text-accent rounded-xl transition-all"
                  title="Edit Project"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2.5 hover:bg-red-500/10 text-text-muted hover:text-red-500 rounded-xl transition-all"
                  title="Delete Project"
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
