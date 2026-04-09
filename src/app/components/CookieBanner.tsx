'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[100]"
        >
          <div className="card p-6 glow-border bg-background/80 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 blur-2xl rounded-full" />
            
            <button 
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Privacy Intelligence</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  I use essential and internal analytics cookies to understand how you interact with my consultancy services. No third-party tracking is used.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={accept}
                className="btn-primary flex-grow justify-center py-2 text-[10px] uppercase tracking-[0.1em]"
              >
                Accept All <ChevronRight size={14} className="ml-1" />
              </button>
              <button 
                onClick={decline}
                className="btn-outline px-6 py-2 text-[10px] uppercase tracking-[0.1em]"
              >
                Essential Only
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
              <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Aaron Basa Consultancy</span>
              <a href="#" className="text-[9px] text-accent hover:underline font-bold uppercase tracking-widest">Privacy Policy</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
