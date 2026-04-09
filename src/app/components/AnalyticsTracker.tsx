'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin visits
    if (pathname.startsWith('/admin')) return;

    const trackVisit = async () => {
      try {
        await supabase.from('analytics').insert({
          page_path: pathname
        });
      } catch (e) {
        console.error('Analytics failed:', e);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
