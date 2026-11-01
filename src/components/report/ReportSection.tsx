import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ReportSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

export function ReportSection({ id, icon: Icon, title, description, children }: ReportSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 glass-panel p-6 sm:p-8">
      <header className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
          <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-400">{children}</p>
  );
}
