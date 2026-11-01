import { CheckCircle2, Quote } from 'lucide-react';
import type { EvidenceItem, SourceRecord } from '@/types/research';

export type SourceLookup = Record<string, SourceRecord | undefined>;

export function SourceChip({ id, source }: { id: string; source?: SourceRecord }) {
  return (
    <span
      title={source?.url ?? id}
      className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
    >
      <span className="font-semibold text-cyan-300">{id}</span>
      {source ? <span className="truncate text-slate-400">{source.domain}</span> : null}
    </span>
  );
}

export function EvidenceQuote({ evidence, sources }: { evidence: EvidenceItem; sources: SourceLookup }) {
  return (
    <figure className="rounded-xl border-l-2 border-cyan-400/60 bg-slate-950/50 p-4">
      <div className="flex gap-3">
        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" aria-hidden="true" />
        <blockquote className="text-sm leading-relaxed text-slate-200">{evidence.quote}</blockquote>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-2 pl-7 text-xs text-slate-400">
        <SourceChip id={evidence.source_id} source={sources[evidence.source_id]} />
        <span className="inline-flex items-center gap-1 text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          Found in source text
        </span>
      </figcaption>
    </figure>
  );
}
