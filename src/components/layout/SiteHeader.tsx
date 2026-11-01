import { History, Home, Search, Sparkles } from 'lucide-react';
import type { AppRoute } from '@/hooks/useHashRoute';
import { SAMPLE_REPORT_ID } from '@/services/researchApi';
import { Logo } from '@/components/brand/Logo';

interface SiteHeaderProps {
  route: AppRoute;
  navigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home, matches: (r: AppRoute) => r.name === 'landing' },
  { label: 'Research', path: '/research', icon: Search, matches: (r: AppRoute) => r.name === 'research' },
  { label: 'History', path: '/history', icon: History, matches: (r: AppRoute) => r.name === 'history' },
  {
    label: 'Sample',
    path: `/reports/${SAMPLE_REPORT_ID}`,
    icon: Sparkles,
    matches: (r: AppRoute) => r.name === 'report' && r.id === SAMPLE_REPORT_ID,
  },
];

export function SiteHeader({ route, navigate }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060b17]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          aria-label="Digital Dark Spot home"
        >
          <Logo />
          <span className="text-left">
            <span className="block text-sm font-semibold tracking-tight text-white sm:text-base">Digital Dark Spot</span>
            <span className="hidden text-xs text-slate-400 sm:block">Information gap detection</span>
          </span>
        </button>

        <nav className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active = item.matches(route);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium transition duration-200 sm:px-3.5 sm:text-sm ${
                  active
                    ? 'bg-cyan-400/15 text-cyan-200 shadow-inner shadow-cyan-400/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
