import { ArrowLeft, Calendar, Globe, Sparkles } from 'lucide-react';
import { ResearchStatusBadge } from '@/components/history/HistoryList';
import type { ResearchRecord } from '@/types/research';

interface ReportHeaderProps {
  record: ResearchRecord;
  onBack: () => void;
}

export function ReportHeader({ record, onBack }: ReportHeaderProps) {
  const created = new Date(record.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="space-y-6">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to history
      </button>

      <div className="glass-panel relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-wrap items-center gap-2">
          <ResearchStatusBadge status={record.status} />
          {record.is_sample ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-200">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              SAMPLE DATA, NOT LIVE RESEARCH
            </span>
          ) : null}
        </div>
        <h1 className="relative mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{record.topic}</h1>
        <p className="relative mt-3 max-w-3xl text-base leading-relaxed text-slate-300">"{record.research_question}"</p>
        <div className="relative mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {created}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {record.sources.length} source{record.sources.length === 1 ? '' : 's'} reviewed
          </span>
        </div>
      </div>
    </header>
  );
}
