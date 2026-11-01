import { useCallback, useEffect, useState } from 'react';
import { deleteResearch, listHistory } from '@/services/researchApi';
import type { HistoryItem } from '@/types/research';

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listHistory());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'History could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteResearch(id);
      setItems((current) => current.filter((item) => item.id !== id));
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'The report could not be deleted.';
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, loading, error, reload, remove };
}
