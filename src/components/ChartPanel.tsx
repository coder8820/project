"use client";

import { usePriceFeed } from "@/lib/usePriceFeed";
import { ArrowDown, ArrowUp, ZoomIn, ZoomOut } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  symbol: string;
};

const WINDOW_MAP: Record<string, number> = {
  "1m": 20,
  "5m": 60,
  "15m": 120,
  ALL: Infinity,
};

export function ChartPanel({ symbol }: Props) {
  const { points } = usePriceFeed(symbol);
  const [range, setRange] = useState<"1m" | "5m" | "15m" | "ALL">("5m");
  const [zoom, setZoom] = useState(0);
  const [yOffsetSteps, setYOffsetSteps] = useState(0);

  const data = useMemo(
    () =>
      points.map((p) => {
        const close = p.price;
        const spread = 0.2;
        return {
          time: new Date(p.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          close,
          high: close + spread * 1.5,
          low: close - spread * 1.5,
          volume: p.volume,
        };
      }),
    [points],
  );

  const baseWindowData = useMemo(() => {
    const maxPoints = WINDOW_MAP[range];
    if (!Number.isFinite(maxPoints)) return data;
    return data.slice(-maxPoints);
  }, [data, range]);

  const visibleData = useMemo(() => {
    if (!baseWindowData.length) return baseWindowData;
    const factor = 1 + zoom * 0.4; // each zoom step narrows window
    const targetLength = Math.max(
      10,
      Math.floor(baseWindowData.length / factor),
    );
    return baseWindowData.slice(-targetLength);
  }, [baseWindowData, zoom]);

  const priceDomain = useMemo(() => {
    if (!visibleData.length) return undefined;
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    visibleData.forEach((d) => {
      if (d.low < min) min = d.low;
      if (d.high > max) max = d.high;
    });
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return undefined;
    }
    const rangeSpan = Math.max(max - min, 1);
    const padding = rangeSpan * 0.1;
    min -= padding;
    max += padding;
    const step = rangeSpan * 0.2;
    const offset = step * yOffsetSteps;
    return { min: min + offset, max: max + offset };
  }, [visibleData, yOffsetSteps]);

  const handleZoomIn = () => setZoom((z) => Math.min(3, z + 1));
  const handleZoomOut = () => setZoom((z) => Math.max(0, z - 1));
  const handlePanUp = () => setYOffsetSteps((s) => Math.min(3, s + 1));
  const handlePanDown = () => setYOffsetSteps((s) => Math.max(-3, s - 1));

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div>
          <div className="font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {symbol} / USD
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Live price • micro structure • session volume
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 rounded-full bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 sm:flex">
            <span className="px-1 text-[9px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Range
            </span>
            {(["1m", "5m", "15m", "ALL"] as const).map((label) => {
              const active = range === label;
              return (
                <button
                  key={label}
                  onClick={() => setRange(label)}
                  className={`rounded-full px-2 py-0.5 transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
            <span>Streaming</span>
          </div>
        </div>
      </div>

      <div className="relative h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={visibleData}>
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="2 4"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10, fill: "#94A3B8" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
              tick={{ fontSize: 10, fill: "#94A3B8" }}
              domain={
                priceDomain
                  ? [priceDomain.min, priceDomain.max]
                  : ["auto", "auto"]
              }
            />
            <YAxis yAxisId="volume" orientation="left" hide />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#E5E7EB",
                fontSize: 12,
              }}
            />
            <Bar
              yAxisId="volume"
              dataKey="volume"
              barSize={6}
              fill="#9CA3AF"
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={280}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="close"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={280}
              animationEasing="ease-out"
            />
            <Brush
              dataKey="time"
              height={16}
              travellerWidth={10}
              stroke="#6366F1"
              fill="#EEF2FF"
            />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700">
            <button
              type="button"
              onClick={handleZoomOut}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />
            <button
              type="button"
              onClick={handlePanUp}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handlePanDown}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Session volume</span>
        <span>{range} • 1m bars • Nasdaq</span>
      </div>
    </div>
  );
}

