'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_SERVICES = [
  { 
    id: 'ams', 
    title: 'Asset Management System', 
    description: 'A comprehensive solution for tracking enterprise hardware and assets with automated lifecycle and depreciation reporting.',
    icon: '📦',
    features: ['Real-time lifecycle tracking', 'Automated audit trails', 'Precision depreciation logs']
  },
  { 
    id: 'ai-bot', 
    title: 'Custom AI Integration', 
    description: 'Tailored LLM-powered assistants designed to handle customer support or internal workflow automation.',
    icon: '🤖',
    features: ['Context-aware responses', 'Seamless API integration', 'Custom personality tuning']
  },
  { 
    id: 'lms', 
    title: 'Learning & Knowledge MS', 
    description: 'Scalable educational platforms for corporate training, onboarding, or private educational institutions.',
    icon: '🎓',
    features: ['Progress tracking', 'Multimedia lesson delivery', 'Automated certification']
  }
];

export default function Services() {
  const [services, setServices] = useState<any[]>(DEFAULT_SERVICES);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('site_configs').select('data').eq('key', 'services').single();
      if (data?.data && data.data.length > 0) {
        setServices(data.data);
      }
    }
    fetchServices();
  }, []);

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-heading mb-4"
          >
            Solutions Suite
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Enterprise-Grade <span className="gradient-text">Systems</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl leading-relaxed"
          >
            I architect and deploy specialized internal tools and high-performance applications designed to automate complex business workflows.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 glow-border group flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                  {service.icon}
                </div>
                {index === 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                    <Sparkles size={10} className="text-accent" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Most Popular</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-accent-light transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature: string, fIndex: number) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-xs text-text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={`/services/inquiry/${service.id}`} 
                className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-accent transition-all"
              >
                Inquire Implementation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}

          {/* Special Custom Offering Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: services.length * 0.1 }}
            className="p-8 rounded-2xl border-2 border-dashed border-surface-border bg-surface/30 flex flex-col justify-center items-center text-center space-y-6 group hover:border-accent/40 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-surface-light border border-surface-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Bespoke Software</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Have a unique challenge? I build custom end-to-end applications from discovery to deployment.
              </p>
            </div>
            <Link href="/#contact" className="btn-outline py-2 px-6 text-[10px]">
              Discuss Your Idea
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-accent rounded-full blur-[160px] opacity-10 animate-pulse-glow" />
      </div>
    </section>
  );
}
