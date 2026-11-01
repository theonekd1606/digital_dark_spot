import { Briefcase, GraduationCap, Microscope, Scale } from 'lucide-react';

const USE_CASES = [
  {
    icon: GraduationCap,
    title: 'Scholarship and admissions',
    description: 'Compare official pages and older guides to find eligibility rules, deadlines and documents to confirm before applying.',
  },
  {
    icon: Scale,
    title: 'Policy and regulation changes',
    description: 'Spot where summaries disagree with official text, and which rules may have changed since an article was written.',
  },
  {
    icon: Briefcase,
    title: 'Vendor and product comparison',
    description: 'See which pricing, feature or contract details are missing from the vendor pages you reviewed.',
  },
  {
    icon: Microscope,
    title: 'Literature and background reviews',
    description: 'Track open questions across papers and articles, and flag claims that need a primary source before you cite them.',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Use cases</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Where a missed detail costs the most</h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {USE_CASES.map((useCase) => {
          const Icon = useCase.icon;
          return (
            <article key={useCase.title} className="glass-panel glass-panel-hover flex gap-5 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon className="h-5 w-5 text-sky-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{useCase.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
