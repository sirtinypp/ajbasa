'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, CheckCircle2 } from 'lucide-react';

export default function ServicesManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  const fetchServices = useCallback(async () => {
    const { data } = await supabase.from('site_configs').select('*').eq('key', 'services').single();
    if (data) {
      setServices(data.data || []);
    } else {
      // Default initial offerings
      setServices([
        { 
          id: 'ams', 
          title: 'Asset Management System', 
          category: 'Enterprise',
          description: 'Strategic tracking of enterprise hardware, software licenses, and physical assets with automated lifecycle and audit logs.',
          icon: '📦',
          features: ['Real-time lifecycle tracking', 'Depreciation calculators', 'Automated audit trails']
        },
        { 
          id: 'hris', 
          title: 'HR Information & Management System', 
          category: 'Enterprise',
          description: 'A full-featured workforce portal managing employee records, digital onboarding, performance reviews, and payroll readiness.',
          icon: '👥',
          features: ['Employee self-service portal', 'Secure document vault', 'Automated onboarding pipelines']
        },
        { 
          id: 'lms', 
          title: 'Learning Management System', 
          category: 'Enterprise',
          description: 'Scalable educational ecosystem for corporate training, internal knowledge bases, and private institution course delivery.',
          icon: '🎓',
          features: ['Progress analytics dashboard', 'Certification engine', 'Interactive multimedia lessons']
        },
        { 
          id: 'ai-bot', 
          title: 'Custom AI Chatbot Integration', 
          category: 'Automation',
          description: 'Next-gen LLM assistants trained on your private domain data to automate customer support and internal helpdesk workflows.',
          icon: '🤖',
          features: ['Context-aware intelligence', 'Multi-channel deployment', 'Custom personality tuning']
        },
        { 
          id: 'dtr-face', 
          title: 'DTR with Facial Recognition', 
          category: 'Identity',
          description: 'Biometric time tracking system utilizing facial recognition to eliminate time-theft and streamline attendance auditing.',
          icon: '👤',
          features: ['Anti-spoofing technology', 'Shift & schedule management', 'Real-time attendance alerts']
        },
        { 
          id: 'monitoring', 
          title: 'Operational Monitoring Tools', 
          category: 'Automation',
          description: 'Customized real-time dashboards to track infrastructure health, service uptime, and operational KPIs.',
          icon: '📊',
          features: ['Live data visualization', 'Threshold-based alerts', 'Historical trend analysis']
        },
        { 
          id: 'event-reg', 
          title: 'Automated Event Registration', 
          category: 'Business Tools',
          description: 'Complete event ticketing and registration engine with QR code verification and automated guest communications.',
          icon: '🎟️',
          features: ['QR check-in system', 'Automated ticket delivery', 'Guest list management']
        },
        { 
          id: 'virtual-store', 
          title: 'Virtual Store Ecosystem', 
          category: 'Business Tools',
          description: 'Custom-built e-commerce platforms with integrated inventory management and secure merchant checkout flows.',
          icon: '🛒',
          features: ['Inventory synchronization', 'Secure payment gateways', 'Sales tracking systems']
        },
        { 
          id: 'basic-web', 
          title: 'Basic Professional Website', 
          category: 'Business Tools',
          description: 'Ultra-fast, SEO-optimized professional landing pages designed for high-conversion and brand authority.',
          icon: '🌐',
          features: ['High-performance Vitals', 'Mobile-first design', 'SEO core configuration']
        }
      ]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = () => {
    const newService = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Service Offering',
      description: 'Describe the problem you are solving and the results your system delivers.',
      icon: '✨',
      features: ['Feature 1', 'Feature 2']
    };
    setServices([...services, newService]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const updateFeature = (sIndex: number, fIndex: number, value: string) => {
    const newServices = [...services];
    newServices[sIndex].features[fIndex] = value;
    setServices(newServices);
  };

  const addFeature = (sIndex: number) => {
    const newServices = [...services];
    newServices[sIndex].features.push('New Feature');
    setServices(newServices);
  };

  const removeFeature = (sIndex: number, fIndex: number) => {
    const newServices = [...services];
    newServices[sIndex].features = newServices[sIndex].features.filter((_: any, i: number) => i !== fIndex);
    setServices(newServices);
  };

  async function saveServices() {
    setSaving(true);
    const { error } = await supabase.from('site_configs').upsert({
      key: 'services',
      data: services
    });
    
    setSaving(false);
    if (error) {
      alert('Error saving services: ' + error.message);
    } else {
      alert('Offerings updated successfully!');
    }
  }

  if (loading) return <div className="p-20 text-center">Loading Offerings...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-up pb-20">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md py-6 mb-8 border-b border-surface-border flex justify-between items-center px-4 -mx-4">
        <div>
          <h2 className="text-3xl font-bold">Offerings & Solutions</h2>
          <p className="text-text-secondary text-sm">Create specific systems and packages for external clients.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={addService}
            className="btn-outline px-4 py-2"
          >
            <Plus size={18} /> Add New Suite
          </button>
          <button 
            onClick={saveServices} 
            disabled={saving} 
            className="btn-primary min-w-[150px] justify-center"
          >
            {saving ? 'Saving...' : 'Save All Offerings'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <AnimatePresence>
          {services.map((service, sIndex) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card p-8 glow-border relative group"
            >
              <button 
                onClick={() => removeService(sIndex)}
                className="absolute top-6 right-6 p-2 text-text-muted hover:text-red-500 hover:bg-red-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                   <label className="label">Icon / Emoji</label>
                   <input 
                    value={service.icon} 
                    onChange={(e) => updateService(sIndex, 'icon', e.target.value)}
                    className="form-input text-4xl text-center py-6 h-auto"
                   />
                </div>

                <div className="md:col-span-3 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Solution Title</label>
                      <input 
                        value={service.title} 
                        onChange={(e) => updateService(sIndex, 'title', e.target.value)}
                        className="form-input font-bold"
                      />
                    </div>
                    <div>
                      <label className="label">Internal ID</label>
                      <input 
                        value={service.id} 
                        onChange={(e) => updateService(sIndex, 'id', e.target.value)}
                        className="form-input text-text-muted bg-surface/50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Description (Value Proposition)</label>
                    <textarea 
                      value={service.description} 
                      onChange={(e) => updateService(sIndex, 'description', e.target.value)}
                      rows={3}
                      className="form-input resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="label">Key Features & Results</label>
                      <button 
                        onClick={() => addFeature(sIndex)}
                        className="text-[10px] uppercase tracking-widest font-bold text-accent hover:text-accent-light transition-colors"
                      >
                        + Add Feature
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.features.map((feature: string, fIndex: number) => (
                        <div key={fIndex} className="relative flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                          <input 
                            value={feature} 
                            onChange={(e) => updateFeature(sIndex, fIndex, e.target.value)}
                            className="form-input py-2 text-xs"
                          />
                          <button 
                            onClick={() => removeFeature(sIndex, fIndex)}
                            className="p-1 text-text-muted hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {services.length === 0 && (
          <div className="text-center py-20 card border-dashed">
            <p className="text-text-muted mb-4">You haven&apos;t defined any solution suites yet.</p>
            <button onClick={addService} className="btn-primary">Create Your First Offering</button>
          </div>
        )}
      </div>
    </div>
  );
}
