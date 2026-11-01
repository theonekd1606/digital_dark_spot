import { History } from 'lucide-react';
import { HistoryList } from '@/components/history/HistoryList';
import { ResearchForm } from '@/components/research/ResearchForm';
import { RunStatusPanel } from '@/components/research/RunStatusPanel';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useHistory } from '@/hooks/useHistory';
import { useResearchRun } from '@/hooks/useResearchRun';
import { SAMPLE_REPORT_ID } from '@/services/researchApi';
import { useCallback } from 'react';

interface ResearchPageProps {
  navigate: (path: string) => void;
}

const RECENT_LIMIT = 5;

export function ResearchPage({ navigate }: ResearchPageProps) {
  const openReport = useCallback((id: string) => navigate(`/reports/${id}`), [navigate]);
  const run = useResearchRun(openReport);
  const history = useHistory();
  const busy = run.phase === 'creating' || run.phase === 'analyzing';

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Research dashboard</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Start a new analysis</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            Name the topic, state the question, and add the public pages that should answer it. The analysis shows what they cover, what they miss, and what conflicts.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-6">
            <ResearchForm busy={busy} onSubmit={run.start} />
            <RunStatusPanel
              phase={run.phase}
              error={run.error}
              onRetry={run.retry}
              onViewSample={() => navigate(`/reports/${SAMPLE_REPORT_ID}`)}
            />
          </div>

          <aside className="glass-panel p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <History className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-white">Recent research</h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/history')}
                className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                View all
              </button>
            </div>
            <div className="mt-5">
              <HistoryList
                compact
                items={history.items.slice(0, RECENT_LIMIT)}
                loading={history.loading}
                error={history.error}
                onOpen={(id) => navigate(`/reports/${id}`)}
              />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
