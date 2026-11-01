import { GitCompare, History, ListChecks, Quote, Target, CalendarClock } from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Information gap detection',
    description: 'Breaks your research question into the subtopics it needs, then flags the ones your sources never cover.',
  },
  {
    icon: GitCompare,
    title: 'Conflict detection',
    description: 'Places contradicting claims side by side with both sources, and explains why they may differ.',
  },
  {
    icon: CalendarClock,
    title: 'Outdated information warnings',
    description: 'Uses publication dates and years in the text to flag material that may no longer apply, and labels undated sources.',
  },
  {
    icon: Quote,
    title: 'Traceable evidence',
    description: 'Every key quote is checked against the extracted source text. Quotes that cannot be matched are removed.',
  },
  {
    icon: ListChecks,
    title: 'Prioritized verification checklist',
    description: 'Turns the gaps into High, Medium and Low actions, with official sources recommended where they matter.',
  },
  {
    icon: History,
    title: 'Saved research history',
    description: 'Keep every analysis, reopen past reports, and remove the ones you no longer need.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Features</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built to show what your sources leave out
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          A summary tells you what the sources say. Digital Dark Spot also tells you what they do not say, and where to check.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="glass-panel glass-panel-hover p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
