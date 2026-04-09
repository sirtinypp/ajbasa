'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CORE_PILLARS = [
  { 
    id: 'ops',
    title: 'Operations & Resource Suites', 
    description: 'High-performance internal tools designed to automate complex workflows. Includes specialized systems for Asset Management (AMS), Workforce (HRIS), and Knowledge (LMS).',
    icon: '🏢',
    features: ['Strategic automation', 'Multi-tenant architectures', 'Precision reporting']
  },
  { 
    id: 'ai-id',
    title: 'AI & Identity Systems', 
    description: 'Leveraging next-gen technology to secure and scale operations. From custom AI Chatbot integrations to biometric Time Recording (DTR) with Facial Recognition.',
    icon: '🤖',
    features: ['Biometric security', 'LLM-powered automation', 'Real-time monitoring']
  },
  { 
    id: 'growth',
    title: 'Digital Business Growth', 
    description: 'End-to-end digital ecosystems for rapid scaling. Automated Event Registration, bespoke Virtual Stores, and high-conversion Professional Web presences.',
    icon: '🚀',
    features: ['Ecommerce ecosystems', 'Scalable registration', 'Performance optimization']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-heading mb-4 text-accent"
          >
            Solutions Suite
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Strategic <span className="gradient-text">Systems</span> Architecture
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl leading-relaxed"
          >
            I architect and deploy specialized enterprise-grade solutions. Explore my core service pillars or view the full catalog of individual software modules.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {CORE_PILLARS.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 glow-border group flex flex-col h-full"
            >
              <div className="text-4xl mb-8 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-accent-light transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="space-y-3 mb-8 border-t border-surface-border pt-6">
                {service.features.map((feature: string, fIndex: number) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-xs text-text-primary/70">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/solutions" 
                className="btn-primary w-full justify-center text-[10px] py-4"
              >
                Explore Modules <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
            <Link 
              href="/solutions" 
              className="btn-outline px-10 py-4 flex items-center gap-3 group transition-all"
            >
              <span className="uppercase tracking-[0.2em] font-bold text-xs">View Full Software Catalog</span>
              <div className="p-1 bg-accent/20 rounded-full group-hover:bg-accent transition-colors">
                <ArrowRight size={14} />
              </div>
            </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 text-accent">
        <div className="absolute inset-0 bg-current rounded-full blur-[160px] opacity-10 animate-pulse-glow text-accent" />
      </div>
    </section>
  );
}
