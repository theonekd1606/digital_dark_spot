import { Link2, FileText, Target, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: Link2,
    title: 'Collect your sources',
    description: 'Add up to eight public web addresses. Private, local and internal addresses are blocked for safety.',
  },
  {
    icon: FileText,
    title: 'Extract and cite',
    description: 'Readable text is pulled from each page with its URL, title and publication date when one is published.',
  },
  {
    icon: Target,
    title: 'Detect gaps and conflicts',
    description: 'The analysis compares what your question needs with what the sources say, and flags contradictions and old material.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify what matters',
    description: 'Review the evidence quotes and work through the prioritized checklist before you rely on the answer.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">From question to verified checklist</h2>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="glass-panel relative p-6">
                <span className="absolute right-5 top-5 text-4xl font-bold text-white/[0.06]" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 ring-1 ring-cyan-400/25">
                  <Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
