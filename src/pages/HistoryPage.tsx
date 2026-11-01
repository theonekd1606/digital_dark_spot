import { History } from 'lucide-react';
import { HistoryList } from '@/components/history/HistoryList';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useHistory } from '@/hooks/useHistory';

interface HistoryPageProps {
  navigate: (path: string) => void;
}

export function HistoryPage({ navigate }: HistoryPageProps) {
  const history = useHistory();

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Research history</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Saved analyses</h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">
              Reopen any past report or remove the ones you no longer need. Sample data is kept for demonstrations.
            </p>
          </div>
          <button type="button" onClick={() => navigate('/research')} className="btn-primary">
            <History className="h-4 w-4" aria-hidden="true" />
            New research
          </button>
        </div>

        <div className="mt-10">
          <HistoryList
            items={history.items}
            loading={history.loading}
            error={history.error}
            onOpen={(id) => navigate(`/reports/${id}`)}
            onDelete={history.remove}
          />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
