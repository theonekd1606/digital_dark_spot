import { GitCompare } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { SourceChip, type SourceLookup } from '@/components/report/EvidenceQuote';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { ConflictItem } from '@/types/research';

interface ConflictsSectionProps {
  conflicts: ConflictItem[];
  sources: SourceLookup;
}

export function ConflictsSection({ conflicts, sources }: ConflictsSectionProps) {
  return (
    <ReportSection
      id="conflicts"
      icon={GitCompare}
      title="Conflicting claims"
      description="Claims from different sources that appear inconsistent. Differences in wording, dates or scope may explain them, so each one needs checking."
    >
      {conflicts.length === 0 ? (
        <EmptyNote>No inconsistent claims were detected between the reviewed sources.</EmptyNote>
      ) : (
        <ul className="space-y-5">
          {conflicts.map((conflict, index) => (
            <li key={`${conflict.source_one}-${conflict.source_two}-${index}`} className="rounded-xl border border-rose-400/20 bg-rose-500/[0.03] p-5">
              <StatusBadge tone="conflict" />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ClaimPanel label="Claim one" claim={conflict.claim_one} sourceId={conflict.source_one} sources={sources} />
                <ClaimPanel label="Claim two" claim={conflict.claim_two} sourceId={conflict.source_two} sources={sources} />
              </div>
              <div className="mt-4 rounded-lg bg-slate-950/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Possible explanation</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{conflict.explanation}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}

function ClaimPanel({
  label,
  claim,
  sourceId,
  sources,
}: {
  label: string;
  claim: string;
  sourceId: string;
  sources: SourceLookup;
}) {
  const source = sources[sourceId];
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <SourceChip id={sourceId} source={source} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-100">{claim}</p>
      {source?.title ? <p className="mt-3 truncate text-xs text-slate-500">{source.title}</p> : null}
    </div>
  );
}
