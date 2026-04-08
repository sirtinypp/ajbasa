'use client';

import { useState } from 'react';
import { portfolioData } from '../lib/portfolio-data';

export default function Contact() {
  const { identity } = portfolioData;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gradient-start)] rounded-full opacity-[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[var(--gradient-end)] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="section-heading">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3">
            Let&apos;s work together
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you. Drop me a message and I&apos;ll get back to you as
            soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: '📧',
                label: 'Email',
                value: identity.email,
                href: `mailto:${identity.email}`,
              },
              {
                icon: '💻',
                label: 'GitHub',
                value: identity.github.replace('https://', ''),
                href: identity.github,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 flex items-center gap-4 glow-border group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div>
                  <div className="text-sm text-text-muted">{item.label}</div>
                  <div className="text-text-primary font-medium group-hover:text-accent-light transition-colors">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="card p-8 space-y-5 glow-border"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm text-text-muted mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm text-text-muted mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm text-text-muted mb-2 font-medium"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm text-text-muted mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="form-input resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={submitted}
              >
                <span>
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
