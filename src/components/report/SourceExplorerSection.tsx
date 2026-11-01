import { CalendarDays, ExternalLink, Globe, Library } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { SourceChip } from '@/components/report/EvidenceQuote';
import type { ExtractionStatus, ReportContent, SourceRecord } from '@/types/research';

interface SourceExplorerSectionProps {
  sources: SourceRecord[];
  references: ReportContent['source_references'];
}

const EXTRACTION_LABELS: Record<ExtractionStatus, { label: string; classes: string }> = {
  extracted: { label: 'Text extracted', classes: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' },
  insufficient_text: { label: 'Limited text', classes: 'border-amber-400/30 bg-amber-500/10 text-amber-200' },
  inaccessible: { label: 'Not accessible', classes: 'border-rose-400/30 bg-rose-500/10 text-rose-200' },
  blocked: { label: 'Blocked', classes: 'border-rose-400/30 bg-rose-500/10 text-rose-200' },
  unsupported_type: { label: 'Unsupported format', classes: 'border-rose-400/30 bg-rose-500/10 text-rose-200' },
};

export function SourceExplorerSection({ sources, references }: SourceExplorerSectionProps) {
  return (
    <ReportSection
      id="sources"
      icon={Library}
      title="Source explorer"
      description="Each source with its extraction status, the claims drawn from it, and the quotes that support them."
    >
      {sources.length === 0 ? (
        <EmptyNote>No sources are recorded for this research.</EmptyNote>
      ) : (
        <ul className="grid gap-5 lg:grid-cols-2">
          {sources.map((source) => {
            const reference = references.find((item) => item.source_id === source.id);
            const status = EXTRACTION_LABELS[source.extraction_status];
            return (
              <li key={source.id} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <SourceChip id={source.id} />
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${status.classes}`}>{status.label}</span>
                </div>

                <h3 className="mt-3 text-base font-semibold leading-snug text-white">
                  {source.title ?? 'Title not available'}
                </h3>

                <dl className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <dt className="sr-only">Domain</dt>
                    <dd className="truncate">{source.domain || 'Unknown domain'}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <dt className="sr-only">Publication date</dt>
                    <dd>{source.published_at ? `Published ${source.published_at}` : 'Undated'}</dd>
                  </div>
                </dl>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex max-w-full items-center gap-1.5 truncate text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{source.url}</span>
                </a>

                {source.error ? <p className="mt-3 rounded-lg bg-rose-500/5 p-3 text-xs leading-relaxed text-rose-200">{source.error}</p> : null}

                {reference && reference.key_claims.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key claims</p>
                    <ul className="mt-2 space-y-1.5">
                      {reference.key_claims.map((claim) => (
                        <li key={claim} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                          {claim}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {reference && reference.evidence_snippets.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Evidence snippets</p>
                    {reference.evidence_snippets.map((snippet) => (
                      <blockquote key={snippet} className="rounded-lg border-l-2 border-cyan-400/50 bg-slate-950/50 px-3 py-2 text-xs italic leading-relaxed text-slate-200">
                        "{snippet}"
                      </blockquote>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </ReportSection>
  );
}
