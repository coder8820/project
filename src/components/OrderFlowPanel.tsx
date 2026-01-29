"use client";

import { useMemo } from "react";
import { usePriceFeed } from "@/lib/usePriceFeed";

type Props = {
  symbol: string;
};

export function OrderFlowPanel({ symbol }: Props) {
  const { latest } = usePriceFeed(symbol);

  const levels = useMemo(() => {
    const mid = latest?.price ?? 420.5;
    const spread = 0.06;

    const synthetic = [];
    for (let i = 3; i >= 1; i--) {
      const bid = mid - spread * i;
      const ask = mid + spread * i;
      synthetic.push({
        level: i,
        bid,
        ask,
        bidSize: 100 + Math.random() * 300,
        askSize: 100 + Math.random() * 300,
      });
    }
    return synthetic;
  }, [latest]);

  return (
    <div className="rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-2 flex items-center justify-between text-[11px]">
        <div className="font-semibold text-slate-900 dark:text-slate-50">
          Order Flow Snapshot
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500">
          Synthetic depth • Top 3 levels
        </div>
      </div>
      <div className="space-y-1.5 text-[11px]">
        {levels.map((lvl) => {
          const bidPct = Math.min(100, (lvl.bidSize / 400) * 100);
          const askPct = Math.min(100, (lvl.askSize / 400) * 100);
          return (
            <div
              key={lvl.level}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5 dark:bg-slate-900"
            >
              <span className="w-6 text-[10px] text-slate-400 dark:text-slate-500">
                L{lvl.level}
              </span>
              <div className="flex-1">
                <div className="mb-0.5 flex items-center gap-1">
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-emerald-100/70 dark:bg-emerald-900/30">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/80"
                      style={{ width: `${bidPct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right font-medium text-emerald-600 dark:text-emerald-300">
                    {lvl.bid.toFixed(2)}
                  </span>
                  <span className="w-10 text-right text-[10px] text-emerald-700 dark:text-emerald-300">
                    {lvl.bidSize.toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-rose-100/70 dark:bg-rose-900/30">
                    <div
                      className="absolute inset-y-0 right-0 rounded-full bg-rose-500/80"
                      style={{ width: `${askPct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right font-medium text-rose-600 dark:text-rose-300">
                    {lvl.ask.toFixed(2)}
                  </span>
                  <span className="w-10 text-right text-[10px] text-rose-700 dark:text-rose-300">
                    {lvl.askSize.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

