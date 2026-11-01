import type { ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import { ReportHeader } from '@/components/report/ReportHeader';
import { ReportView } from '@/components/report/ReportView';
import { RunStatusPanel, type RunFailure } from '@/components/research/RunStatusPanel';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useResearchRecord } from '@/hooks/useResearchRecord';
import { SAMPLE_REPORT_ID } from '@/services/researchApi';

interface ReportPageProps {
  id: string;
  navigate: (path: string) => void;
}

export function ReportPage({ id, navigate }: ReportPageProps) {
  const { record, loading, error, retrying, retryError, retryAnalysis } = useResearchRecord(id);
  const backToHistory = () => navigate('/history');

  let body: ReactNode;

  if (loading) {
    body = (
      <div className="glass-panel flex items-center gap-4 p-8" role="status" aria-live="polite">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-300" aria-hidden="true" />
        <p className="text-sm text-slate-300">Loading report...</p>
      </div>
    );
  } else if (error || !record) {
    body = (
      <div className="glass-panel border-rose-400/25 p-8" role="alert">
        <div className="flex items-start gap-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" aria-hidden="true" />
          <div className="space-y-3">
            <p className="text-sm font-semibold text-rose-100">This report could not be opened</p>
            <p className="text-sm leading-relaxed text-slate-300">
              {error ?? 'No report exists with this link. It may have been deleted.'}
            </p>
            <button type="button" onClick={backToHistory} className="btn-secondary px-4 py-2 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to history
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    const failure: RunFailure | null = retryError
      ? { code: 'RETRY_FAILED', message: retryError, retryable: true }
      : record.status === 'failed'
        ? {
            code: 'ANALYSIS_FAILED',
            message: record.error_message ?? 'The analysis stopped before a report was produced.',
            retryable: true,
          }
        : null;

    body = (
      <div className="space-y-8">
        <ReportHeader record={record} onBack={backToHistory} />
        {record.report ? (
          <ReportView record={record} report={record.report} />
        ) : (
          <div className="space-y-6">
            <RunStatusPanel
              phase={retrying ? 'analyzing' : 'failed'}
              error={failure}
              onRetry={retryAnalysis}
              onViewSample={() => navigate(`/reports/${SAMPLE_REPORT_ID}`)}
            />
            {record.status === 'pending' || record.status === 'running' ? (
              <div className="glass-panel p-6" role="status">
                <p className="text-sm text-slate-300">
                  This research is still being prepared. Reopen it from history in a moment.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">{body}</div>
      <SiteFooter />
    </>
  );
}
