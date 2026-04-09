'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function ContentEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'experience';
  const isNew = id === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!isNew) fetchItem();
    else {
      // Default structures for new items
      if (type === 'experience') setFormData({ role: '', company: '', period: '', description: '', highlights: '', order_index: 0 });
      else if (type === 'achievements') setFormData({ title: '', year: '', description: '', icon: '🏆' });
      else if (type === 'events') setFormData({ title: '', date: '', description: '', category: 'Workshop' });
    }
  }, [id, type]);

  async function fetchItem() {
    const { data } = await supabase.from(type).select('*').eq('id', id).single();
    if (data) {
      setFormData({
        ...data,
        highlights: data.highlights?.join('\n') || ''
      });
    }
    setLoading(false);
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const submissionData = { ...formData };
    if (type === 'experience' && typeof submissionData.highlights === 'string') {
      submissionData.highlights = submissionData.highlights.split('\n').filter((h: string) => h.trim());
    }

    const { error } = isNew 
      ? await supabase.from(type).insert([submissionData])
      : await supabase.from(type).update(submissionData).eq('id', id);

    if (!error) router.push('/admin/content');
    else {
      alert('Error: ' + error.message);
      setSaving(false);
    }
  }

  if (loading) return <div className="p-20 text-center">Loading Content...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-up">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/content" className="text-text-muted hover:text-text-primary">← Content</Link>
        <h2 className="text-3xl font-bold capitalize">{isNew ? `New ${type}` : `Edit ${type}`}</h2>
      </div>

      <form onSubmit={handleSubmit} className="card p-8 glow-border space-y-6">
        {type === 'experience' && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="label">Role</label><input name="role" value={formData.role} onChange={handleChange} className="form-input" required /></div>
              <div><label className="label">Company</label><input name="company" value={formData.company} onChange={handleChange} className="form-input" required /></div>
            </div>
            <div><label className="label">Period (e.g. 2021 - Present)</label><input name="period" value={formData.period} onChange={handleChange} className="form-input" required /></div>
            <div><label className="label">Overview Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="form-input" /></div>
            <div><label className="label">Key Highlights (One per line)</label><textarea name="highlights" value={formData.highlights} onChange={handleChange} rows={5} className="form-input" /></div>
            <div><label className="label">Display Order (Higher = Later)</label><input type="number" name="order_index" value={formData.order_index} onChange={handleChange} className="form-input" /></div>
          </>
        )}

        {type === 'achievements' && (
          <>
            <div><label className="label">Achievement Title</label><input name="title" value={formData.title} onChange={handleChange} className="form-input" required /></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="label">Year</label><input name="year" value={formData.year} onChange={handleChange} className="form-input" required /></div>
              <div><label className="label">Icon (Emoji)</label><input name="icon" value={formData.icon} onChange={handleChange} className="form-input" /></div>
            </div>
            <div><label className="label">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="form-input" /></div>
          </>
        )}

        {type === 'events' && (
          <>
            <div><label className="label">Event Title</label><input name="title" value={formData.title} onChange={handleChange} className="form-input" required /></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="label">Date/Time</label><input name="date" value={formData.date} onChange={handleChange} className="form-input" required /></div>
              <div><label className="label">Category</label><input name="category" value={formData.category} onChange={handleChange} className="form-input" /></div>
            </div>
            <div><label className="label">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="form-input" /></div>
          </>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Link href="/admin/content" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary min-w-[150px] justify-center">
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
