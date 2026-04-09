'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function logVisit() {
      // Check for consent (Optional: we can log basic hits regardless if considered legitimate interest)
      const consent = localStorage.getItem('cookie-consent');
      if (consent === 'decline') return;

      try {
        await supabase.from('visitor_logs').insert([{
          path: pathname,
          referer: document.referrer || 'direct',
          user_agent: navigator.userAgent
        }]);
      } catch (err) {
        console.error('Tracking failed:', err);
      }
    }

    logVisit();
  }, [pathname]);

  return null;
}
