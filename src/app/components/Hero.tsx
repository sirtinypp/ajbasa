import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ identity, hero }: { identity?: any, hero?: any }) {
  if (!identity || !hero) return null;


  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gradient-start)] rounded-full opacity-[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gradient-end)] rounded-full opacity-[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="animate-fade-up flex items-center gap-3 justify-center lg:justify-start mb-6">
            <div className="status-dot" />
            <span className="text-sm text-text-secondary font-medium">
              Available for opportunities
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-text-primary mb-6">
            Hi, I&apos;m{' '}
            <span className="gradient-text">{identity.nickname}</span>
            <br />
            <span className="text-text-secondary font-medium text-2xl sm:text-3xl lg:text-4xl">
              {identity.title}
            </span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            {hero.shortBio}
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/inquiry" className="btn-primary">
              <span>Initiate Project Assessment</span>
              <span className="relative z-10">→</span>
            </Link>
            <Link href="/#contact" className="btn-outline">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="animate-fade-up-delay-3 mt-12 flex flex-wrap gap-x-8 gap-y-6 justify-center lg:justify-start">
            {hero.stats.map((stat: any) => (
              <div key={stat.label} className="text-center lg:text-left min-w-[80px]">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Headshot */}
        <div className="flex-shrink-0 animate-scale-in">
          <div className="headshot-wrapper w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full">
            <Image
              src="/aaron-headshot.png"
              alt="Aaron - Full-Stack Developer"
              width={288}
              height={288}
              className="relative z-10 rounded-full object-cover w-full h-full"
              style={{ objectPosition: 'center 15%' }}
              preload
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delay-3">
        <span className="text-xs text-text-muted uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-text-muted/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
