import { Logo } from '@/components/brand/Logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="text-sm font-semibold text-white">Digital Dark Spot</p>
            <p className="text-xs text-slate-400">AI-assisted information gap detection</p>
          </div>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          Every finding links back to the source text it came from. Outputs are research aids that highlight what to verify, not final answers.
        </p>
        <p className="text-xs text-slate-500">Built for Shinchan Online Hackathon 2026</p>
      </div>
    </footer>
  );
}
