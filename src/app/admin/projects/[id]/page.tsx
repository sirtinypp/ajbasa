'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function ProjectEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === 'new';
  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    role: '',
    category: 'enterprise',
    description: '',
    long_description: '',
    features: '',
    impact: '',
    tags: '',
    color: 'from-blue-600 to-cyan-600',
    icon: '🚀',
    thumbnail: '',
    link: ''
  });

  useEffect(() => {
    if (!isNew) {
      fetchProject();
    }
  }, [id]);

  async function fetchProject() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      setFormData({
        ...data,
        features: data.features?.join('\n') || '',
        impact: data.impact?.join('\n') || '',
        tags: data.tags?.join(', ') || ''
      });
    }
    setLoading(false);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-slug
    if (name === 'title' && isNew) {
      setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const submissionData = {
      ...formData,
      features: formData.features.split('\n').filter(i => i.trim()),
      impact: formData.impact.split('\n').filter(i => i.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    const { error } = isNew 
      ? await supabase.from('projects').insert([submissionData])
      : await supabase.from('projects').update(submissionData).eq('id', id);

    if (error) {
      alert('Error saving project: ' + error.message);
      setSaving(false);
    } else {
      router.push('/admin/projects');
    }
  }

  if (loading) return <div className="p-20 text-center">Loading Project...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-up">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md py-6 mb-8 border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="text-text-muted hover:text-text-primary">← Projects</Link>
          <h2 className="text-3xl font-bold">{isNew ? 'Create New Project' : 'Edit Project'}</h2>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/projects" className="btn-outline">Cancel</Link>
          <button 
            type="button" 
            onClick={(e) => {
              const form = document.querySelector('form');
              form?.requestSubmit();
            }} 
            disabled={saving} 
            className="btn-primary min-w-[150px] justify-center"
          >
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-8 glow-border space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Project Title</label>
              <input 
                name="title"
                value={formData.title} 
                onChange={handleChange}
                placeholder="e.g. SPMO Suite"
                className="form-input" 
                required 
              />
            </div>
            <div>
              <label className="label">URL Slug</label>
              <input 
                name="slug"
                value={formData.slug} 
                onChange={handleChange}
                placeholder="e.g. spmo-suite"
                className="form-input" 
                required 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Your Role</label>
              <input 
                name="role"
                value={formData.role} 
                onChange={handleChange}
                placeholder="e.g. Lead Full-Stack Developer"
                className="form-input" 
                required 
              />
            </div>
            <div>
              <label className="label">Category</label>
              <select 
                name="category"
                value={formData.category} 
                onChange={handleChange}
                className="form-input"
              >
                <option value="enterprise">Enterprise</option>
                <option value="web-app">Web App</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Short Description</label>
            <input 
              name="description"
              value={formData.description} 
              onChange={handleChange}
              placeholder="1-2 sentences for the card grid"
              className="form-input" 
              required 
            />
          </div>

          <div>
            <label className="label">Detailed Content (Long Description)</label>
            <textarea 
              name="long_description"
              value={formData.long_description} 
              onChange={handleChange}
              rows={5}
              placeholder="The full story of the project..."
              className="form-input resize-none" 
              required 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-8 glow-border">
            <label className="label">Core Features (One per line)</label>
            <textarea 
              name="features"
              value={formData.features} 
              onChange={handleChange}
              rows={6}
              placeholder="Feature 1&#10;Feature 2..."
              className="form-input resize-none text-sm" 
            />
          </div>
          <div className="card p-8 glow-border">
            <label className="label">Technical Impact (One per line)</label>
            <textarea 
              name="impact"
              value={formData.impact} 
              onChange={handleChange}
              rows={6}
              placeholder="Reduced latency by 40%&#10;Handled 10k users..."
              className="form-input resize-none text-sm" 
            />
          </div>
        </div>

        <div className="card p-8 glow-border space-y-6">
           <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="label">Icon (Emoji)</label>
                <input name="icon" value={formData.icon} onChange={handleChange} className="form-input" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Tags (Comma separated)</label>
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Next.js, Supabase, Tailwind" className="form-input" />
              </div>
           </div>

           <div>
              <label className="label">Color Gradient (Tailwind Classes)</label>
              <input name="color" value={formData.color} onChange={handleChange} placeholder="from-blue-600 to-indigo-600" className="form-input" />
           </div>

           <div className="space-y-4">
              <label className="label">Project Thumbnail</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <input 
                  name="thumbnail" 
                  value={formData.thumbnail} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                  className="form-input flex-grow" 
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      setSaving(true);
                      const fileExt = file.name.split('.').pop();
                      const fileName = `${Math.random()}.${fileExt}`;
                      const filePath = `${fileName}`;

                      const { error: uploadError } = await supabase.storage
                        .from('project-thumbnails')
                        .upload(filePath, file);

                      if (uploadError) {
                        alert('Error uploading image: ' + uploadError.message);
                      } else {
                        const { data } = supabase.storage
                          .from('project-thumbnails')
                          .getPublicUrl(filePath);
                        
                        setFormData(prev => ({ ...prev, thumbnail: data.publicUrl }));
                      }
                      setSaving(false);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <button type="button" className="btn-outline whitespace-nowrap">
                    📁 Upload Real Screenshot
                  </button>
                </div>
              </div>
              {formData.thumbnail && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border mt-2">
                  <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
           </div>

           <div>
              <label className="label">Live Project Link</label>
              <input name="link" value={formData.link} onChange={handleChange} placeholder="https://..." className="form-input" />
           </div>
        </div>

        <div className="flex justify-end gap-4 pb-20">
          <Link href="/admin/projects" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary min-w-[150px] justify-center">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
