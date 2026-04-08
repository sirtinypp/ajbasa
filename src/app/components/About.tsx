import { portfolioData } from '../lib/portfolio-data';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gradient-mid)] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="section-heading">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3">
            The story so far
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-text-secondary leading-relaxed text-lg'
                    : 'text-text-secondary leading-relaxed'
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            {about.infoCards.map((item) => (
              <div
                key={item.title}
                className="card p-5 flex flex-col gap-2 glow-border"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-text-muted font-medium">
                  {item.title}
                </span>
                <span className="text-text-primary font-semibold">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
