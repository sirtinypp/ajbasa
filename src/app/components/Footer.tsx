import Link from 'next/link';

export default function Footer({ identity }: { identity?: any }) {
  const currentYear = new Date().getFullYear();
  if (!identity) return null;


  return (
    <footer className="relative pb-12 pt-4">
      <div className="footer-divider mb-12" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] flex items-center justify-center text-white font-bold text-xs transition-transform group-hover:scale-110">
              {identity.nickname[0]}
            </div>
            <span className="font-semibold text-text-primary text-sm">
              {identity.nickname}<span className="text-accent-light">.dev</span>
            </span>
          </Link>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light uppercase tracking-tighter">
              Aaron Basa
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Strategic Softare Solutions for Modern Enterprises.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Strategic Solutions Legend</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="text-accent">AMS:</span> Asset Management System</li>
              <li><span className="text-accent">HRIS:</span> HR Information System</li>
              <li><span className="text-accent">LMS:</span> Learning Management System</li>
              <li><span className="text-accent">AI-Bot:</span> Custom AI Chatbot</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="text-text-secondary hover:text-accent transition-colors">Experience</Link></li>
              <li><Link href="/#services" className="text-text-secondary hover:text-accent transition-colors">Solutions</Link></li>
              <li><Link href="/projects" className="text-text-secondary hover:text-accent transition-colors">Projects</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admin" className="text-text-secondary hover:text-accent transition-colors">Admin Dashboard</Link></li>
              <li><Link href="/#contact" className="text-text-secondary hover:text-accent transition-colors">Contact Me</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 border-t border-surface-border text-[10px] uppercase tracking-widest text-text-muted font-bold">
          <div>© {new Date().getFullYear()} Aaron Christian Basa.</div>
          <div className="flex gap-6">
            <span>Built with Next.js & Supabase</span>
            <span>Strategic Consultancy Tier: Elite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
