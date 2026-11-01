import { BadgeCheck, Layers } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { EvidenceQuote, SourceChip, type SourceLookup } from '@/components/report/EvidenceQuote';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { KeyFinding } from '@/types/research';

interface KeyFindingsSectionProps {
  findings: KeyFinding[];
  sources: SourceLookup;
}

export function KeyFindingsSection({ findings, sources }: KeyFindingsSectionProps) {
  return (
    <ReportSection
      id="key-findings"
      icon={Layers}
      title="Key information extracted"
      description="Facts and claims pulled from the sources. Sourced findings include the quotes that support them."
    >
      {findings.length === 0 ? (
        <EmptyNote>No key findings were extracted from the reviewed sources.</EmptyNote>
      ) : (
        <ul className="space-y-4">
          {findings.map((finding) => (
            <li key={finding.finding} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  {finding.category}
                </span>
                {finding.basis === 'sourced' ? (
                  <StatusBadge tone="supported" />
                ) : (
                  <StatusBadge tone="verify" label="AI suggestion, requires verification" />
                )}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white sm:text-base">{finding.finding}</p>

              {finding.source_ids.length > 0 ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500">Based on</span>
                  {finding.source_ids.map((id) => (
                    <SourceChip key={id} id={id} source={sources[id]} />
                  ))}
                </div>
              ) : null}

              {finding.evidence.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {finding.evidence.map((item) => (
                    <EvidenceQuote key={`${item.source_id}-${item.quote}`} evidence={item} sources={sources} />
                  ))}
                </div>
              ) : (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  No supporting quote is available. Treat this as a suggestion to check.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}
