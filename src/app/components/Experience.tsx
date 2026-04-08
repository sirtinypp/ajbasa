import { portfolioData } from '../lib/portfolio-data';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[var(--gradient-end)] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="section-heading">Experience</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3">
            Where I&apos;ve worked
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {experience.map((exp) => (
            <div key={exp.role + exp.company} className="timeline-item">
              <div className="card p-7 glow-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <p className="text-accent-light font-medium text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-text-muted font-mono bg-[var(--surface)] px-3 py-1 rounded-full self-start">
                    {exp.period}
                  </span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
