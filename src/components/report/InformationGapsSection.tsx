import { CircleDashed } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { EvidenceQuote, type SourceLookup } from '@/components/report/EvidenceQuote';
import { PriorityBadge, StatusBadge } from '@/components/ui/StatusBadge';
import type { InformationGap } from '@/types/research';

interface InformationGapsSectionProps {
  gaps: InformationGap[];
  sources: SourceLookup;
}

export function InformationGapsSection({ gaps, sources }: InformationGapsSectionProps) {
  return (
    <ReportSection
      id="information-gaps"
      icon={CircleDashed}
      title="Information gaps"
      description="Subtopics a complete answer needs that the reviewed sources do not cover. A gap means not found in these sources, not that the information does not exist."
    >
      {gaps.length === 0 ? (
        <EmptyNote>The reviewed sources appear to cover the subtopics this question needs.</EmptyNote>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {gaps.map((gap) => (
            <li key={gap.title} className="flex flex-col rounded-xl border border-amber-400/15 bg-amber-500/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone="gap" label={gap.status_label} />
                <PriorityBadge priority={gap.importance} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{gap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{gap.description}</p>
              {gap.evidence.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {gap.evidence.map((item) => (
                    <EvidenceQuote key={`${item.source_id}-${item.quote}`} evidence={item} sources={sources} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-xs text-slate-500">No source text was found that addresses this subtopic.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}
