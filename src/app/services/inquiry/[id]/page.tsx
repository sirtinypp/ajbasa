'use client';

import { useEffect, useState, use } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, ChevronRight, Building2, ClipboardList, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DEFAULT_SERVICES = [
  { id: 'ams', title: 'Asset Management System' },
  { id: 'hris', title: 'HR Information & Management System' },
  { id: 'lms', title: 'Learning Management System' },
  { id: 'ai-bot', title: 'Custom AI Chatbot Integration' }
];

export default function ServiceInquiryPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    challenges: '',
    currentWorkflow: '',
    desiredFeatures: '',
    impact: '',
    timeline: '3-6 months',
    budget: 'Enterprise'
  });

  useEffect(() => {
    async function fetchService() {
      // Try DB first
      const { data } = await supabase.from('site_configs').select('data').eq('key', 'services').single();
      let selected = data?.data?.find((s: any) => s.id === params.id);
      
      // Fallback to defaults
      if (!selected) {
        selected = DEFAULT_SERVICES.find(s => s.id === params.id);
      }

      setService(selected || { id: 'custom', title: 'Custom Solution' });
    }
    fetchService();
  }, [params.id]);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Expand internal IDs to full titles for the report
    const serviceTitleMap: Record<string, string> = {
      'ams': 'Asset Management System',
      'hris': 'HR Information & Management System',
      'lms': 'Learning Management System',
      'ai-bot': 'Custom AI Chatbot Integration'
    };
    const displayTitle = service?.title || serviceTitleMap[params.id] || params.id;

    // Formulate a robust discovery message
    const discoveryReport = `
PROJECT DISCOVERY REPORT: ${displayTitle}
--------------------------------------------------
CLIENT PROFILE:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company}
- Role: ${formData.role}

THE CHALLENGE:
${formData.challenges}

CURRENT WORKFLOW:
${formData.currentWorkflow}

DESIRED ECOSYSTEM:
${formData.desiredFeatures}

EXPECTED IMPACT:
${formData.impact}

LOGISTICS:
- Desired Timeline: ${formData.timeline}
- Budget Range: ${formData.budget}
    `;

    const { error } = await supabase.from('inquiries').insert([{
      name: formData.name,
      email: formData.email,
      subject: `[DISCOVERY] ${service?.title || params.id}`,
      message: discoveryReport
    }]);

    if (error) {
      alert('Error sending inquiry: ' + error.message);
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => router.push('/'), 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 max-w-lg text-center space-y-6 glow-border"
        >
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
             <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold">Assessment Received</h2>
          <p className="text-text-secondary">
            Thank you, {formData.name}. I am now reviewing your project requirements. 
            I typically respond to discovery requests within 24-48 hours with a preliminary proposal.
          </p>
          <div className="text-xs text-text-muted">Redirecting you home...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary p-6 md:p-12 lg:p-20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Project Discovery</span>
              <h1 className="text-4xl font-bold leading-tight">
                Architecting your <span className="gradient-text">{service?.title || 'System'}</span>
              </h1>
            </div>

            <div className="space-y-6">
              <div className={`p-4 rounded-xl border transition-all ${step >= 1 ? 'border-accent/40 bg-accent/5' : 'border-surface-border opacity-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={18} className="text-accent" />
                  <span className="font-bold text-sm">Context & Role</span>
                </div>
                <p className="text-xs text-text-secondary">Basic information about you and your organization.</p>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${step >= 2 ? 'border-accent/40 bg-accent/5' : 'border-surface-border opacity-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <ClipboardList size={18} className="text-accent" />
                  <span className="font-bold text-sm">Discovery & Pain Points</span>
                </div>
                <p className="text-xs text-text-secondary">What keeps you from scaling efficient operations today?</p>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${step >= 3 ? 'border-accent/40 bg-accent/5' : 'border-surface-border opacity-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Target size={18} className="text-accent" />
                  <span className="font-bold text-sm">Desired Outcome</span>
                </div>
                <p className="text-xs text-text-secondary">What does the perfect version of this system look like?</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-8 md:p-10 glow-border space-y-8">
              
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs">1</span>
                    Basic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label">Full Name</label>
                      <input required className="form-input" placeholder="John Doe" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Work Email</label>
                      <input required type="email" className="form-input" placeholder="john@company.com" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label">Company Name</label>
                      <input required className="form-input" placeholder="Acme Corp" value={formData.company} onChange={(e) => updateForm('company', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Your Role</label>
                      <input required className="form-input" placeholder="CTO, Manager, etc." value={formData.role} onChange={(e) => updateForm('role', e.target.value)} />
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="btn-primary w-full justify-center py-4">
                    Continue Discovery <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs">2</span>
                    Needs Assessment
                  </h3>
                  <div className="space-y-2">
                    <label className="label">What are the primary challenges you are facing?</label>
                    <textarea required rows={4} className="form-input resize-none" placeholder="Explain the roadblocks or manual tasks that are slowing you down..." value={formData.challenges} onChange={(e) => updateForm('challenges', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="label">What is your current workflow or system?</label>
                    <textarea required rows={3} className="form-input resize-none" placeholder="e.g., We use Excel spreadsheets and manual email tracking..." value={formData.currentWorkflow} onChange={(e) => updateForm('currentWorkflow', e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline flex-grow justify-center py-4 text-xs uppercase tracking-widest font-bold">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary flex-[2] justify-center py-4">Next Step <ChevronRight size={18} /></button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                   <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs">3</span>
                    The Vision
                  </h3>
                  <div className="space-y-2">
                    <label className="label">Describe the "Must-Have" features of the target system.</label>
                    <textarea required rows={4} className="form-input resize-none" placeholder="What are the essential functions this system must perform?" value={formData.desiredFeatures} onChange={(e) => updateForm('desiredFeatures', e.target.value)} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label">Target Timeline</label>
                      <select className="form-input" value={formData.timeline} onChange={(e) => updateForm('timeline', e.target.value)}>
                        <option>ASAP (Urgent)</option>
                        <option>1-2 months</option>
                        <option>3-6 months</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="label">Project Scale</label>
                      <select className="form-input" value={formData.budget} onChange={(e) => updateForm('budget', e.target.value)}>
                        <option>Startup (Customized MVP)</option>
                        <option>Small Business Solution</option>
                        <option>Enterprise Integration</option>
                        <option>Consulting Only</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="btn-outline flex-grow justify-center py-4 text-xs uppercase tracking-widest font-bold">Back</button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary flex-[2] justify-center py-4"
                    >
                      {loading ? 'Processing...' : 'Submit Assessment'} <Zap size={18} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
