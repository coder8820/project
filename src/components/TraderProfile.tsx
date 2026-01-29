"use client";

import { CheckCircle2, Mail, Phone, ShieldCheck, X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export function TraderProfile({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end bg-black/20 bg-gradient-to-t from-black/40 via-black/10 to-transparent backdrop-blur-sm">
      <div className="mr-6 mb-6 w-full max-w-sm rounded-3xl bg-white/95 p-4 text-xs text-slate-700 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
              <span className="text-sm font-semibold">TP</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Trader Pro
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span>Verified • MoonBucks Desk</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Close profile"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-3 text-[11px]">
          <div>
            <div className="text-slate-400 dark:text-slate-500">Strategy</div>
            <div className="mt-0.5 font-semibold text-slate-900 dark:text-slate-50">
              Intraday EQ
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500">Risk tier</div>
            <div className="mt-0.5 font-semibold text-emerald-500">
              Balanced
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500">
              Win rate (3M)
            </div>
            <div className="mt-0.5 font-semibold text-slate-900 dark:text-slate-50">
              61.4%
            </div>
          </div>
        </div>

        <div className="mb-3 rounded-2xl bg-slate-50 px-3 py-2 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-100">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Profile summary
          </div>
          <p className="leading-relaxed">
            Focused on large-cap US tech with disciplined risk limits and
            tight execution. Uses MoonBucks terminal for real-time orderflow
            and volatility monitoring.
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>trader.pro@moonbucks.terminal</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>Desk: +1 (312) 555-0199</span>
            </div>
          </div>
          <button className="rounded-full bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            View full profile
          </button>
        </div>
      </div>
    </div>
  );
}

