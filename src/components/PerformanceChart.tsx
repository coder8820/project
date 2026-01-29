"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PnlPoint = {
  time: string;
  value: number;
};

// Simple mock intraday P&L curve for portfolio
const baseSeries: PnlPoint[] = Array.from({ length: 24 }).map((_, idx) => {
  const hour = 9 + Math.floor(idx / 2);
  const minute = (idx % 2) * 30;
  const label = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  const drift = Math.sin((idx / 24) * Math.PI * 2) * 250;
  const noise = (Math.random() - 0.5) * 80;
  const value = 500 + drift + noise;
  return { time: label, value: Math.round(value) };
});

export function PerformanceChart() {
  return (
    <section className="mt-2 border-t border-slate-200/70 bg-white/90 px-4 pb-4 pt-3 text-xs dark:border-slate-800 dark:bg-slate-900/80 lg:px-6">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Intraday P&L
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Simulated portfolio performance for the current session
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
          +$742 (1.4%)
        </div>
      </div>
      <div className="h-32 rounded-2xl bg-slate-50 dark:bg-slate-900">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={baseSeries}>
            <defs>
              <linearGradient id="pnl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              width={50}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                borderColor: "#E5E7EB",
                fontSize: 11,
              }}
              formatter={(val) => [`$${val}`, "P&L"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#pnl)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

