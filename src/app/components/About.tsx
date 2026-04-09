export default function About({ about, achievements = [], events = [] }: { about?: any, achievements?: any[], events?: any[] }) {
  if (!about) return null;

  // Helper to parse "Month Year" or "Year"
  const parseDate = (d: string) => {
    if (!d) return 0;
    const parts = d.split(' ');
    if (parts.length === 1) return parseInt(parts[0]); // Year only
    const months: { [key: string]: number } = { 
      Jan: 1, Feb: 2, March: 3, April: 4, May: 5, June: 6, 
      July: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12 
    };
    const month = months[parts[0]] || 0;
    const year = parseInt(parts[1]);
    return year * 12 + month;
  };

  const sortedAchievements = [...achievements].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const sortedEvents = [...events].sort((a, b) => parseDate(b.date) - parseDate(a.date));


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
            {about.paragraphs.map((p: any, i: number) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-text-secondary leading-relaxed text-lg font-medium'
                    : 'text-text-secondary leading-relaxed'
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.infoCards.map((item: any) => (
              <div
                key={item.title}
                className="card p-5 flex flex-col gap-2 glow-border"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  {item.title}
                </span>
                <span className="text-text-primary font-bold">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Events Row */}
        <div className="mt-24 grid lg:grid-cols-2 gap-20">
          {/* Achievements Section */}
          <div className="animate-fade-up">
            <h3 className="text-xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                🏆
              </span>
              Key Achievements
            </h3>
            <div className="space-y-4">
              {sortedAchievements.map((item: any) => (
                <div key={item.id} className="card p-6 glow-border group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-2xl bg-surface p-2 rounded-lg border border-surface-border">
                      {item.icon}
                    </span>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="font-bold text-text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="animate-fade-up">
            <h3 className="text-xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-mid/10 flex items-center justify-center text-gradient-mid">
                📅
              </span>
              Notable Events
            </h3>
            <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-surface-border">
              {sortedEvents.map((item: any) => (
                <div key={item.id} className="relative pl-12 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full border border-surface-border bg-background flex items-center justify-center z-10 group-hover:border-accent transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                        {item.date}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter bg-surface-light border border-surface-border text-text-secondary group-hover:text-accent transition-colors">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
