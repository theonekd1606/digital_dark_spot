import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TONE_COLORS, type StatusTone } from '@/components/ui/StatusBadge';
import type { ReportContent } from '@/types/research';

interface AnalysisOverviewProps {
  report: ReportContent;
}

interface OverviewDatum {
  label: string;
  count: number;
  tone: StatusTone;
}

export function AnalysisOverview({ report }: AnalysisOverviewProps) {
  const sourced = report.key_findings.filter((finding) => finding.basis === 'sourced').length;
  const suggested = report.key_findings.length - sourced;
  const high = report.verification_checklist.filter((item) => item.priority === 'High').length;

  const data: OverviewDatum[] = [
    { label: 'Supported findings', count: sourced, tone: 'supported' },
    { label: 'Information gaps', count: report.information_gaps.length, tone: 'gap' },
    { label: 'Potential conflicts', count: report.conflicts.length, tone: 'conflict' },
    { label: 'Outdated or undated', count: report.outdated_warnings.length, tone: 'verify' },
    { label: 'AI suggestions', count: suggested, tone: 'verify' },
    { label: 'High-priority actions', count: high, tone: 'conflict' },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
          <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" />
          <XAxis type="number" allowDecimals={false} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="label"
            width={150}
            stroke="#64748b"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(148,163,184,0.06)' }}
            contentStyle={{ background: '#0b1224', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 12, color: '#e2e8f0' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Bar dataKey="count" name="Count" radius={[0, 8, 8, 0]} barSize={18}>
            {data.map((datum) => (
              <Cell key={datum.label} fill={TONE_COLORS[datum.tone]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
