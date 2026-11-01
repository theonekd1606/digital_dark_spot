import { useCallback, useEffect, useState } from 'react';

export type AppRoute =
  | { name: 'landing' }
  | { name: 'research' }
  | { name: 'history' }
  | { name: 'report'; id: string };

export function parseRoute(hash: string): AppRoute {
  const path = hash.replace(/^#/, '') || '/';
  const reportMatch = path.match(/^\/reports\/([0-9a-f-]{36})$/i);
  if (reportMatch) return { name: 'report', id: reportMatch[1] };
  if (path === '/research') return { name: 'research' };
  if (path === '/history') return { name: 'history' };
  return { name: 'landing' };
}

export function useHashRoute(): [AppRoute, (path: string) => void] {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handleChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return [route, navigate];
}
