import { AlertTriangle, CheckCircle2, CircleDashed, Info } from 'lucide-react';
import type { Priority } from '@/types/research';

export type StatusTone = 'conflict' | 'gap' | 'verify' | 'supported';

const TONE_STYLES: Record<StatusTone, { label: string; classes: string; Icon: typeof AlertTriangle }> = {
  conflict: {
    label: 'Potential conflict',
    classes: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
    Icon: AlertTriangle,
  },
  gap: {
    label: 'Missing or uncertain',
    classes: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
    Icon: CircleDashed,
  },
  verify: {
    label: 'Requires verification',
    classes: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
    Icon: Info,
  },
  supported: {
    label: 'Supported by source',
    classes: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
    Icon: CheckCircle2,
  },
};

export const TONE_COLORS: Record<StatusTone, string> = {
  conflict: '#fb7185',
  gap: '#fbbf24',
  verify: '#38bdf8',
  supported: '#34d399',
};

export function StatusBadge({ tone, label }: { tone: StatusTone; label?: string }) {
  const style = TONE_STYLES[tone];
  const Icon = style.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style.classes}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label ?? style.label}
    </span>
  );
}

const PRIORITY_STYLES: Record<Priority, string> = {
  High: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
  Medium: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  Low: 'border-slate-400/30 bg-slate-500/10 text-slate-300',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${PRIORITY_STYLES[priority]}`}>
      {priority} priority
    </span>
  );
}
