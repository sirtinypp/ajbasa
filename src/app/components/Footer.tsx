import { portfolioData } from '../lib/portfolio-data';
import Link from 'next/link';

export default function Footer() {
  const { identity } = portfolioData;
  const currentYear = new Date().getFullYear();

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

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-accent-light transition-colors"
            >
              GitHub
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-accent-light transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="text-sm text-text-muted hover:text-accent-light transition-colors"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            © {currentYear} {identity.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
