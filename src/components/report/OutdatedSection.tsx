import { CalendarClock } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { SourceChip, type SourceLookup } from '@/components/report/EvidenceQuote';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { OutdatedWarning } from '@/types/research';

interface OutdatedSectionProps {
  warnings: OutdatedWarning[];
  sources: SourceLookup;
}

export function OutdatedSection({ warnings, sources }: OutdatedSectionProps) {
  return (
    <ReportSection
      id="outdated"
      icon={CalendarClock}
      title="Outdated information"
      description="Sources that may no longer reflect current rules, deadlines or policies. Each flag states its reason. Undated sources are labeled as undated, not as outdated."
    >
      {warnings.length === 0 ? (
        <EmptyNote>No publication dates or year references suggest the reviewed sources are outdated.</EmptyNote>
      ) : (
        <ul className="space-y-3">
          {warnings.map((warning) => {
            const undated = warning.reason.startsWith('Undated');
            return (
              <li key={`${warning.source_id}-${warning.reason}`} className="flex flex-col gap-3 rounded-xl border border-sky-400/15 bg-sky-500/[0.03] p-5 sm:flex-row sm:items-start">
                <div className="flex shrink-0 flex-wrap gap-2 sm:w-56 sm:flex-col sm:items-start">
                  <StatusBadge tone="verify" label={undated ? 'Undated source' : 'Possibly outdated'} />
                  <SourceChip id={warning.source_id} source={sources[warning.source_id]} />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{warning.reason}</p>
              </li>
            );
          })}
        </ul>
      )}
    </ReportSection>
  );
}
