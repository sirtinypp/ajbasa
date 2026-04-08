import { portfolioData } from '../lib/portfolio-data';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gradient-mid)] rounded-full opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="section-heading">Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3">
            My toolkit
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            The technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((cat) => (
            <div key={cat.title} className="card p-6 glow-border">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-text-primary">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
