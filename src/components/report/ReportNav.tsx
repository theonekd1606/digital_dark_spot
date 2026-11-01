import type { LucideIcon } from 'lucide-react';

export interface ReportNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

interface ReportNavProps {
  items: ReportNavItem[];
}

export function ReportNav({ items }: ReportNavProps) {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Report sections" className="glass-panel sticky top-20 z-30 p-2 lg:p-3">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => jumpTo(item.id)}
                className="flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-300 transition duration-200 hover:bg-white/5 hover:text-white sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-cyan-300/80" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.count !== undefined ? (
                  <span className="rounded-md bg-white/5 px-1.5 text-[11px] text-slate-400">{item.count}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
