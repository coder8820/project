import { Globe2, Search, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  onProfileClick?: () => void;
};

export function Header({ onProfileClick }: Props) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
          <span className="text-sm font-semibold">MB</span>
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            MoonBucks Terminal
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Multi-asset trading workspace
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-4 max-lg:hidden">
        <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
          <Globe2 className="h-3.5 w-3.5" />
          <span>EN</span>
        </button>
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search symbols, markets, news..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 hover:bg-white focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="text-right text-xs">
          <div className="font-semibold text-slate-900 dark:text-slate-50">
            $128,420.55
          </div>
          <div className="text-[11px] font-medium text-emerald-500">
            +$1,842.12 (1.46%)
          </div>
        </div>
        <button
          type="button"
          onClick={onProfileClick}
          className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="mr-2">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-50">
              Trader Pro
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Live account
            </div>
          </div>
          <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-900 shadow-sm">
            PRO
          </span>
        </button>
      </div>
    </header>
  );
}

