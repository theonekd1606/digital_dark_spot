import { useState } from 'react';
import { CheckCircle2, CircleAlert, Loader2, ShieldAlert, X } from 'lucide-react';
import { checkSourceUrl } from '@/services/researchApi';
import type { ExtractionStatus, SourceRecord } from '@/types/research';

export const MAX_SOURCE_FIELDS = 8;

interface SourceUrlFieldProps {
  index: number;
  value: string;
  canRemove: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}

type CheckState =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'done'; result: SourceRecord }
  | { phase: 'error'; message: string };

const CHECK_LABELS: Record<ExtractionStatus, { label: string; classes: string }> = {
  extracted: { label: 'Readable', classes: 'text-emerald-300' },
  insufficient_text: { label: 'Limited text', classes: 'text-amber-300' },
  inaccessible: { label: 'Not accessible', classes: 'text-rose-300' },
  blocked: { label: 'Blocked', classes: 'text-rose-300' },
  unsupported_type: { label: 'Unsupported format', classes: 'text-rose-300' },
};

function isWebAddress(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function SourceUrlField({ index, value, canRemove, onChange, onRemove }: SourceUrlFieldProps) {
  const [check, setCheck] = useState<CheckState>({ phase: 'idle' });
  const trimmed = value.trim();
  const valid = isWebAddress(trimmed);

  const runCheck = async () => {
    setCheck({ phase: 'checking' });
    try {
      setCheck({ phase: 'done', result: await checkSourceUrl(trimmed) });
    } catch (err) {
      setCheck({ phase: 'error', message: err instanceof Error ? err.message : 'The address could not be checked.' });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xs font-semibold text-slate-400">
          S{index + 1}
        </span>
        <input
          type="url"
          inputMode="url"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setCheck({ phase: 'idle' });
          }}
          placeholder="https://example.org/article"
          aria-label={`Source ${index + 1} web address`}
          className="input-field"
        />
        <button
          type="button"
          onClick={runCheck}
          disabled={!valid || check.phase === 'checking'}
          className="btn-secondary shrink-0 px-3 py-2.5 text-xs"
        >
          {check.phase === 'checking' ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : null}
          Check
        </button>
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove source ${index + 1}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {trimmed && !valid ? (
        <p className="pl-12 text-xs text-rose-300">Enter a full address that starts with https:// or http://.</p>
      ) : null}

      {check.phase === 'done' ? <CheckResult result={check.result} /> : null}
      {check.phase === 'error' ? (
        <p className="flex items-center gap-2 pl-12 text-xs text-rose-300">
          <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
          {check.message}
        </p>
      ) : null}
    </div>
  );
}

function CheckResult({ result }: { result: SourceRecord }) {
  const style = CHECK_LABELS[result.extraction_status];
  const readable = result.extraction_status === 'extracted';
  const Icon = readable ? CheckCircle2 : ShieldAlert;
  return (
    <div className="ml-12 flex flex-wrap items-start gap-x-2 gap-y-1 rounded-lg bg-slate-950/50 px-3 py-2 text-xs">
      <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.classes}`} aria-hidden="true" />
      <span className={`font-semibold ${style.classes}`}>{style.label}</span>
      <span className="text-slate-400">
        {readable
          ? `${result.title ?? result.domain}${result.published_at ? `, published ${result.published_at}` : ', no publication date found'}`
          : result.error}
      </span>
    </div>
  );
}
