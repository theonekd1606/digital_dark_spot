import { Network, Search } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-600 shadow-lg shadow-cyan-500/25">
      <Network className="h-5 w-5 text-slate-950" strokeWidth={2.4} aria-hidden="true" />
      <span className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-950 ring-1 ring-cyan-300/60">
        <Search className="h-2.5 w-2.5 text-cyan-300" strokeWidth={3} aria-hidden="true" />
      </span>
    </div>
  );
}
