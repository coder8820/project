"use client";

import { usePriceFeed } from "@/lib/usePriceFeed";

type Props = {
  symbol: string;
};

export function BuySellPanel({ symbol }: Props) {
  const { latest, previous } = usePriceFeed(symbol);

  const price = latest?.price ?? 420.5;
  const prev = previous?.price ?? price;
  const change = price - prev;
  const pct = prev ? (change / prev) * 100 : 0;
  const spread = 0.06;

  const direction = change >= 0 ? "up" : "down";
  const colorClass =
    direction === "up" ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="flex flex-col rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-50">
            Order Ticket
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {symbol} • Nasdaq • Margin 1:5
          </div>
        </div>
        <div className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          DAY • Market
        </div>
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Last price
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {price.toFixed(2)}
            </span>
            <span className={`text-xs font-medium ${colorClass}`}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)} ({pct >= 0 ? "+" : ""}
              {pct.toFixed(2)}%)
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Spread:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {spread.toFixed(2)} ({((spread / price) * 100).toFixed(2)} bps)
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-right text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          Est. position value
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            ${(price * 50).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-2 rounded-2xl bg-emerald-50/80 p-3 ring-1 ring-emerald-100 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-emerald-900/20 dark:ring-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Buy
            </span>
            <span className="text-[10px] text-emerald-700/70 dark:text-emerald-300/80">
              Long
            </span>
          </div>
          <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {(price + spread / 2).toFixed(2)}
          </div>
          <button className="mt-1 w-full rounded-full bg-emerald-500 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-600">
            Buy Market
          </button>
        </div>
        <div className="space-y-2 rounded-2xl bg-rose-50/80 p-3 ring-1 ring-rose-100 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-rose-900/20 dark:ring-rose-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">
              Sell
            </span>
            <span className="text-[10px] text-rose-700/70 dark:text-rose-300/80">
              Short
            </span>
          </div>
          <div className="text-lg font-semibold text-rose-600 dark:text-rose-400">
            {(price - spread / 2).toFixed(2)}
          </div>
          <button className="mt-1 w-full rounded-full bg-rose-500 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-rose-600">
            Sell Market
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <div>
          <div>Qty</div>
          <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <span>50</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              shares
            </span>
          </div>
        </div>
        <div>
          <div>Leverage</div>
          <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <span>5x</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              max 10x
            </span>
          </div>
        </div>
        <div>
          <div>Risk</div>
          <div className="mt-1 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-300">
            <span>1.2%</span>
            <span className="text-[10px]">per trade</span>
          </div>
        </div>
      </div>
    </div>
  );
}

