'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

interface SidebarItemProps {
  href: string;
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

function SidebarItem({ href, icon, label, active, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active
          ? 'bg-accent text-white shadow-lg shadow-accent/20'
          : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { href: '/admin', icon: '📊', label: 'Insights' },
    { href: '/admin/projects', icon: '🚀', label: 'Projects' },
    { href: '/admin/content', icon: '📝', label: 'Content' },
    { href: '/admin/inquiries', icon: '📩', label: 'Inquiries' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
    { href: '/admin/migrate', icon: '🧬', label: 'Sync Data' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 border-r border-surface-border bg-surface flex flex-col fixed h-full z-50 transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-gradient-mid rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-accent/10 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-text-primary">Admin Panel</h2>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Portfolio V2</p>
            </div>
          </Link>
          <button className="lg:hidden text-text-muted" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-surface-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-text-muted hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 min-h-screen w-full overflow-x-hidden">
        <header className="h-16 border-b border-surface-border sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-text-primary hover:bg-surface-light rounded-lg"
              onClick={() => setMobileOpen(true)}
            >
              <span className="text-2xl">☰</span>
            </button>
            <h1 className="text-sm lg:text-lg font-bold text-text-primary capitalize truncate">
              {navItems.find((t) => t.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-light border border-surface-border rounded-lg text-text-secondary hover:text-text-primary transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <span>🌐</span>
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live</span>
            </div>
          </div>

        </header>

        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
