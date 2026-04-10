'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Inquiry() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    category: 'custom-software',
    painPoints: '',
    desiredOutcome: '',
    scope: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);

    const fullMessage = `
ORGANIZATION: ${formData.organization}
ROLE/CONTEXT: ${formData.role}
CATEGORY: ${formData.category}

[THE PAIN POINTS]
${formData.painPoints}

[THE DESIRED OUTCOME]
${formData.desiredOutcome}

[SUMMARY SCOPE]
${formData.scope}
    `.trim();

    const { error } = await supabase
      .from('inquiries')
      .insert([
        { 
          name: formData.name,
          email: formData.email,
          subject: `[DISCOVERY] ${formData.category} Request from ${formData.organization}`,
          message: fullMessage,
          created_at: new Date().toISOString() 
        }
      ]);

    if (error) {
      alert('Error submitting inquiry: ' + error.message);
      setLoading(false);
    } else {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }
  }

  if (submitted) {
    return (
      <div className="noise-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6 mt-20">
          <div className="card max-w-2xl w-full p-12 text-center glow-border animate-fade-up">
            <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center text-4xl mx-auto mb-8">✓</div>
            <h1 className="text-4xl font-bold mb-4 tracking-tighter">Mission Logic Received</h1>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Strategic Discovery initiated. I’ve captured your desired outcomes for <strong>{formData.organization}</strong> and will reach out shortly for a formal assessment.
            </p>
            <div className="flex justify-center">
              <button onClick={() => router.push('/')} className="btn-primary w-full sm:w-auto">
                Return to Command Hub
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="noise-bg min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-6 py-32 w-full">
        <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-widest text-text-muted">High-Tier Institutional Assessment</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight leading-[1.1]">Strategic <span className="gradient-text">Project Discovery</span></h1>
            <p className="text-text-secondary text-lg mb-12 max-w-3xl leading-relaxed">
               I solve institutional information silos with custom architecture. 
               By defining your <strong>Pain Points</strong> and **Desired Outcomes** now, 
               we ensure a mission-precise technical trajectory.
            </p>

            <form onSubmit={(e) => handleSubmit(e)} className="card p-8 sm:p-12 glow-border space-y-12 backdrop-blur-xl">
              
              <div className="space-y-8">
                 <h3 className="section-heading">01. Organizational Context</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="label">Full Name & Contact Email</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                           type="text" required className="form-input" placeholder="Juan Dela Cruz"
                           value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                           type="email" required className="form-input" placeholder="name@org.ph"
                           value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="label">Organization & Current Role</label>
                      <div className="grid grid-cols-2 gap-2">
                         <input 
                            type="text" required className="form-input" placeholder="Organization"
                            value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})}
                         />
                         <input 
                            type="text" required className="form-input" placeholder="Director / Manager"
                            value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                         />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <h3 className="section-heading">02. Strategic Assessment</h3>
                 <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="label">Current Institutional Challenges (Pain Points)</label>
                      <textarea 
                        required rows={3} className="form-input resize-none" 
                        placeholder="What are the current information silos or operational bottlenecks you are facing?"
                        value={formData.painPoints}
                        onChange={(e) => setFormData({...formData, painPoints: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <label className="label">Desired Mission Outcome</label>
                      <textarea 
                        required rows={3} className="form-input resize-none" 
                        placeholder="What does 'Mission Success' look like for this project?"
                        value={formData.desiredOutcome}
                        onChange={(e) => setFormData({...formData, desiredOutcome: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <label className="label">Brief Project Scope</label>
                      <textarea 
                        required rows={2} className="form-input resize-none" 
                        placeholder="Outline specific modules (e.g., HR Hub, Asset Tracker, BI Dashboard)..."
                        value={formData.scope}
                        onChange={(e) => setFormData({...formData, scope: e.target.value})}
                      ></textarea>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-surface-border">
                <div className="text-xs text-text-muted italic max-w-sm">
                   By submitting this discovery request, you are initiating a formal technical assessment for the FY 2026 project cycle.
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto min-w-[250px] justify-center">
                  {loading ? 'Analyzing Metadata...' : 'Submit Strategic Request'}
                </button>
              </div>
            </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
