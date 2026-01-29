"use client";

import { usePriceFeed } from "@/lib/usePriceFeed";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  symbol: string;
};

export function AnalyticsSummary({ symbol }: Props) {
  const { points, latest, previous } = usePriceFeed(symbol);

  const change = latest && previous ? latest.price - previous.price : 0;
  const pct =
    latest && previous && previous.price
      ? (change / previous.price) * 100
      : 0;

  const windowPoints = points.slice(-60);
  const prices = windowPoints.map((p) => p.price);
  const volumes = windowPoints.map((p) => p.volume);
  const avgPrice =
    prices.reduce((sum, v) => sum + v, 0) / (prices.length || 1);
  const variance =
    prices.reduce((sum, v) => sum + (v - avgPrice) ** 2, 0) /
    (prices.length || 1);
  const volatility = Math.sqrt(variance);
  const totalVolume = volumes.reduce((sum, v) => sum + v, 0);

  const sparklineData = windowPoints.map((p) => ({
    time: new Date(p.time).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    }),
    price: p.price,
  }));

  const dirUp = change >= 0;
  const changeColor = dirUp ? "text-emerald-500" : "text-rose-500";

  return (
    <section className="grid gap-3 border-b border-slate-200/70 bg-white/90 px-4 pb-3 pt-3 text-xs dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Realtime Move
              </div>
              <div className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                {latest ? latest.price.toFixed(2) : "--"}
              </div>
            </div>
            <div className={`text-right text-[11px] font-medium ${changeColor}`}>
              <div>
                {dirUp ? "+" : ""}
                {change.toFixed(2)}
              </div>
              <div>
                {dirUp ? "+" : ""}
                {pct.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <div className="hidden flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-[11px] text-slate-600 dark:bg-slate-900 dark:text-slate-300 sm:block">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                1m Realized Vol
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {volatility ? volatility.toFixed(3) : "--"} pts
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Session Volume
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {(totalVolume / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
        <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold uppercase tracking-wide">
            Micro Trend
          </span>
          <span>Last {windowPoints.length || 0} ticks</span>
        </div>
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  borderColor: "#E5E7EB",
                  fontSize: 11,
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#6366F1"
                strokeWidth={1.8}
                fill="url(#spark)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

