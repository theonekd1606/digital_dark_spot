import { AlertTriangle, KeyRound, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import type { RunPhase } from '@/hooks/useResearchRun';

export interface RunFailure {
  code: string;
  message: string;
  retryable: boolean;
}

interface RunStatusPanelProps {
  phase: RunPhase;
  error: RunFailure | null;
  onRetry: () => void;
  onViewSample: () => void;
}

export function RunStatusPanel({ phase, error, onRetry, onViewSample }: RunStatusPanelProps) {
  if (phase === 'creating' || phase === 'analyzing') {
    return (
      <div className="glass-panel flex items-start gap-4 p-6" role="status" aria-live="polite">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/25">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-300" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {phase === 'creating' ? 'Saving your research request...' : 'Reading sources and checking for gaps'}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Pages are read, claims are matched to their quotes, and conflicts and outdated material are checked. This usually takes 20 to 60 seconds.
          </p>
        </div>
      </div>
    );
  }

  if (phase !== 'failed' || !error) return null;

  if (error.code === 'AI_NOT_CONFIGURED') {
    return (
      <div className="glass-panel border-amber-400/25 p-6" role="alert">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-400/30">
            <KeyRound className="h-5 w-5 text-amber-300" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-amber-100">Live analysis needs an AI key</p>
            <p className="text-sm leading-relaxed text-slate-300">
              Add a Gemini API key (or a Groq key as an alternative) to the project's secrets to enable live analysis. Your research will be saved, and the sample analysis remains available in the meantime.
            </p>
            <button type="button" onClick={onViewSample} className="btn-secondary mt-2 px-4 py-2 text-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Open sample analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel border-rose-400/25 p-6" role="alert">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 ring-1 ring-rose-400/30">
            <AlertTriangle className="h-5 w-5 text-rose-300" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-rose-100">The analysis did not finish</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{error.message}</p>
          </div>
        </div>
        {error.retryable ? (
          <button type="button" onClick={onRetry} className="btn-secondary shrink-0 px-4 py-2 text-xs">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Retry analysis
          </button>
        ) : null}
      </div>
    </div>
  );
}
