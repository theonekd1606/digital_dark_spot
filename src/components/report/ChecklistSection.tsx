import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';
import { PriorityBadge } from '@/components/ui/StatusBadge';
import type { ChecklistItem } from '@/types/research';

interface ChecklistSectionProps {
  items: ChecklistItem[];
}

export function ChecklistSection({ items }: ChecklistSectionProps) {
  const [done, setDone] = useState<Set<number>>(new Set());

  const toggle = (index: number) =>
    setDone((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const completed = done.size;
  const percent = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  return (
    <ReportSection
      id="checklist"
      icon={CheckSquare}
      title="Verification checklist"
      description="Prioritized actions to take before relying on this research. Recommendations are suggestions, not findings from the sources."
    >
      {items.length === 0 ? (
        <EmptyNote>No verification actions were generated for this analysis.</EmptyNote>
      ) : (
        <>
          <div className="mb-5 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-medium text-slate-300">
              {completed} of {items.length} done
            </span>
          </div>

          <ul className="space-y-3">
            {items.map((item, index) => {
              const checked = done.has(index);
              return (
                <li key={item.task}>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-pressed={checked}
                    className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition duration-200 ${
                      checked
                        ? 'border-emerald-400/25 bg-emerald-500/[0.04]'
                        : 'border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-white/[0.05]'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                    ) : (
                      <Square className="mt-0.5 h-5 w-5 shrink-0 text-slate-500 group-hover:text-cyan-300" aria-hidden="true" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <PriorityBadge priority={item.priority} />
                      </div>
                      <p className={`mt-2 text-sm font-medium ${checked ? 'text-slate-400 line-through' : 'text-white'}`}>
                        {item.task}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.reason}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </ReportSection>
  );
}
