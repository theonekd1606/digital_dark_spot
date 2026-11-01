import { useState } from 'react';
import { CalendarDays, ChevronRight, Globe, Loader2, Sparkles, Trash2 } from 'lucide-react';
import type { HistoryItem, ResearchStatus } from '@/types/research';

interface HistoryListProps {
  items: HistoryItem[];
  loading: boolean;
  error: string | null;
  compact?: boolean;
  onOpen: (id: string) => void;
  onDelete?: (id: string) => Promise<string | null>;
}

const STATUS_STYLES: Record<ResearchStatus, { label: string; classes: string }> = {
  completed: { label: 'Completed', classes: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' },
  pending: { label: 'Queued', classes: 'border-sky-400/30 bg-sky-500/10 text-sky-200' },
  running: { label: 'Analyzing', classes: 'border-sky-400/30 bg-sky-500/10 text-sky-200' },
  failed: { label: 'Failed', classes: 'border-rose-400/30 bg-rose-500/10 text-rose-200' },
};

export function ResearchStatusBadge({ status }: { status: ResearchStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.classes}`}>
      {status === 'running' || status === 'pending' ? (
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
      ) : null}
      {style.label}
    </span>
  );
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function HistoryList({ items, loading, error, compact = false, onOpen, onDelete }: HistoryListProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8 text-sm text-slate-400" role="status">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-300" aria-hidden="true" />
        Loading research history...
      </div>
    );
  }

  if (error) {
    return <p className="rounded-xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 p-8 text-center">
        <p className="text-sm font-medium text-slate-200">No research yet</p>
        <p className="mt-1 text-sm text-slate-400">Completed and in-progress analyses will appear here.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <HistoryRow key={item.id} item={item} compact={compact} onOpen={onOpen} onDelete={onDelete} />
      ))}
    </ul>
  );
}

interface HistoryRowProps {
  item: HistoryItem;
  compact: boolean;
  onOpen: (id: string) => void;
  onDelete?: (id: string) => Promise<string | null>;
}

function HistoryRow({ item, compact, onOpen, onDelete }: HistoryRowProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!onDelete) return;
    setDeleting(true);
    setDeleteError(null);
    const message = await onDelete(item.id);
    if (message) {
      setDeleteError(message);
      setDeleting(false);
    }
  };

  return (
    <li className="glass-panel glass-panel-hover group p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="min-w-0 flex-1 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">{item.topic}</p>
            {item.is_sample ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium text-cyan-200">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Sample data
              </span>
            ) : null}
            <ResearchStatusBadge status={item.status} />
          </div>
          {compact ? null : <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-400">{item.research_question}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(item.created_at)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {item.source_urls.length} source{item.source_urls.length === 1 ? '' : 's'}
            </span>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {onDelete && !item.is_sample ? (
            confirming ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-lg bg-rose-500/20 px-2.5 py-1.5 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/30 disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                aria-label={`Delete ${item.topic}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )
          ) : null}
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            aria-label={`Open ${item.topic}`}
            className="rounded-lg p-2 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-300"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      {deleteError ? <p className="mt-3 text-xs text-rose-300">{deleteError}</p> : null}
    </li>
  );
}
