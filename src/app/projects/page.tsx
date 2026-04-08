import { portfolioData } from '../lib/portfolio-data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  const { projects } = portfolioData;
  return (
    <div className="noise-bg min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gradient-mid)] rounded-full opacity-[0.05] blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-light transition-colors mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Overview</span>
            </Link>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight">
              Strategic <span className="gradient-text">Systems</span> & Innovations
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A deep dive into the architectures and solutions I&apos;ve engineered 
              for the University of the Philippines System and beyond.
            </p>
          </div>
        </section>

        {/* Projects List */}
        <section className="max-w-7xl mx-auto px-6 space-y-40">
          {projects.map((project, index) => (
            <div 
              key={project.slug} 
              id={project.slug}
              className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-32`}
            >
              {/* Project Info */}
              <div className={`lg:col-span-5 space-y-8 animate-fade-up ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/10`}>
                    {project.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                      {project.title}
                    </h2>
                    <div className="text-accent-light font-medium text-sm mt-1 uppercase tracking-wider">
                      {project.role}
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed text-lg">
                  {project.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-surface-border" />
                      Core Features
                    </h3>
                    <div className="space-y-3">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-accent-light mt-1">▹</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-accent-light uppercase tracking-widest flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-accent-light/20" />
                      Technical Impact
                    </h3>
                    <div className="space-y-3">
                      {project.impact.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-text-secondary group/impact">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span className="group-hover/impact:text-text-primary transition-colors">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface-light)] border border-surface-border text-text-primary hover:border-accent transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                  >
                    <span>Visit Live Portal</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </a>
                  <button className="btn-outline">
                    Technical Docs
                  </button>
                </div>
              </div>

              {/* Project Image / Mockup */}
              <div className="lg:col-span-7 w-full animate-float">
                <div className={`relative aspect-video rounded-3xl overflow-hidden border border-surface-border bg-gradient-to-br ${project.color} group shadow-2xl`}>
                   {project.thumbnail ? (
                     <Image
                       src={project.thumbnail}
                       alt={project.title}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span className="text-8xl grayscale group-hover:scale-125 transition-transform duration-500">
                          {project.icon}
                        </span>
                     </div>
                   )}
                   
                   {/* Glass Overlay for Depth */}
                   <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center">
          <div className="card p-12 glow-border relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full opacity-[0.05] blur-[80px] pointer-events-none" />
             <h2 className="text-3xl font-bold text-text-primary mb-6">
               Need a specialized enterprise solution?
             </h2>
             <p className="text-text-secondary mb-8 max-w-xl mx-auto">
               I specialize in transforming complex administrative requirements 
               into elegant, secure, and high-performance digital platforms.
             </p>
             <Link href="/#contact" className="btn-primary">
               Connect with me
             </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
