import { useCallback, useState } from 'react';
import { createResearch, runAnalysis, ResearchApiError } from '@/services/researchApi';

export type RunPhase = 'idle' | 'creating' | 'analyzing' | 'failed';

export interface ResearchRunInput {
  topic: string;
  research_question: string;
  source_urls: string[];
}

export function useResearchRun(onCompleted: (researchId: string) => void) {
  const [phase, setPhase] = useState<RunPhase>('idle');
  const [researchId, setResearchId] = useState<string | null>(null);
  const [error, setError] = useState<ResearchApiError | null>(null);

  const analyze = useCallback(
    async (id: string) => {
      setPhase('analyzing');
      setError(null);
      try {
        const record = await runAnalysis(id);
        if (record.status !== 'completed') {
          throw new ResearchApiError('The analysis did not complete. Please retry.', 'INCOMPLETE', 200, true);
        }
        setPhase('idle');
        onCompleted(id);
      } catch (err) {
        setPhase('failed');
        setError(
          err instanceof ResearchApiError
            ? err
            : new ResearchApiError('The analysis could not be completed.', 'UNKNOWN', 0, true),
        );
      }
    },
    [onCompleted],
  );

  const start = useCallback(
    async (input: ResearchRunInput) => {
      setPhase('creating');
      setError(null);
      try {
        const record = await createResearch(input);
        setResearchId(record.id);
        await analyze(record.id);
      } catch (err) {
        setPhase('failed');
        setError(
          err instanceof ResearchApiError
            ? err
            : new ResearchApiError('The research could not be started.', 'UNKNOWN', 0, true),
        );
      }
    },
    [analyze],
  );

  const retry = useCallback(() => {
    if (researchId) void analyze(researchId);
  }, [analyze, researchId]);

  const reset = useCallback(() => {
    setPhase('idle');
    setError(null);
    setResearchId(null);
  }, []);

  return { phase, error, researchId, start, retry, reset };
}
