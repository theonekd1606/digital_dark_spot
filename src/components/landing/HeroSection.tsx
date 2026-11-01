import { ArrowRight, BookOpen } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface HeroSectionProps {
  onStart: () => void;
  onViewSample: () => void;
}

const PREVIEW_ROWS = [
  { tone: 'gap' as const, title: 'Renewal conditions', detail: 'Not found in reviewed sources' },
  { tone: 'conflict' as const, title: 'Minimum GPA', detail: '3.5 in the 2026 page vs 3.0 in a 2023 guide' },
  { tone: 'verify' as const, title: 'Forum claim', detail: 'Undated, unofficial. Check before relying on it' },
  { tone: 'supported' as const, title: 'Full-time enrollment', detail: 'Quoted from the 2026 page' },
];

export function HeroSection({ onStart, onViewSample }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-soft-pulse" aria-hidden="true" />
            Evidence-first research intelligence
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Don't Just Find Information.{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              Discover What's Missing.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Digital Dark Spot reads the sources you choose, extracts claims with their exact quotes, and highlights the gaps,
            conflicts, and outdated details you should verify before you act.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onStart} className="btn-primary">
              Start Research
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={onViewSample} className="btn-secondary">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              View sample analysis
            </button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              { value: '6', label: 'analysis stages' },
              { value: '100%', label: 'quotes checked against source text' },
              { value: '4', label: 'status signals' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-white">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-slate-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="glass-panel relative p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-300">Illustrative preview</p>
                <p className="mt-1 text-sm font-semibold text-white">What should a student verify?</p>
              </div>
              <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">3 sources</span>
            </div>

            <ul className="mt-6 space-y-3">
              {PREVIEW_ROWS.map((row) => (
                <li key={row.title} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{row.title}</p>
                    <StatusBadge tone={row.tone} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{row.detail}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              The full sample report is available from the button above. Its sources are fictional and labeled as sample data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
