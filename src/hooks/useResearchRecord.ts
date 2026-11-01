import { useCallback, useEffect, useState } from 'react';
import { getResearch, runAnalysis } from '@/services/researchApi';
import type { ResearchRecord } from '@/types/research';

export function useResearchRecord(id: string) {
  const [record, setRecord] = useState<ResearchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRecord(await getResearch(id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'This report could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const retryAnalysis = useCallback(async () => {
    setRetrying(true);
    setRetryError(null);
    try {
      setRecord(await runAnalysis(id));
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : 'The analysis could not be completed.');
      try {
        setRecord(await getResearch(id));
      } catch {
        // Keep the last known record; the retry error above is already shown.
      }
    } finally {
      setRetrying(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { record, loading, error, retrying, retryError, retryAnalysis };
}
