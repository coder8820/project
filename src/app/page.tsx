"use client";

import { Header } from "@/components/Header";
import { SymbolTabs } from "@/components/SymbolTabs";
import { ChartPanel } from "@/components/ChartPanel";
import { BuySellPanel } from "@/components/BuySellPanel";
import { Watchlist } from "@/components/Watchlist";
import { AlertsPanel } from "@/components/AlertsPanel";
import { AssetSummary } from "@/components/AssetSummary";
import { PositionsTable } from "@/components/PositionsTable";
import { AnalyticsSummary } from "@/components/AnalyticsSummary";
import { OrderFlowPanel } from "@/components/OrderFlowPanel";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TraderProfile } from "@/components/TraderProfile";
import { useState } from "react";

function Dashboard() {
  const [activeSymbol, setActiveSymbol] = useState("AAPL");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <main className="dashboard-shell card-elevated flex w-full max-w-[1600px] flex-col overflow-hidden rounded-[28px] border border-slate-200/60 bg-[#FFFFFF] shadow-sm backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#111827]">
        <Header onProfileClick={() => setShowProfile(true)} />
        <SymbolTabs active={activeSymbol} onChange={setActiveSymbol} />

        <AnalyticsSummary symbol={activeSymbol} />

        <div className="grid flex-1 gap-4 px-4 pb-2 pt-2 lg:grid-cols-[minmax(0,2fr)_minmax(280px,360px)] lg:px-6 lg:pb-4">
          <div className="flex flex-col gap-4">
            <ChartPanel symbol={activeSymbol} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
                <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Session volume</span>
                  <span>09:30 • 16:00 (ET)</span>
                </div>
                <div className="h-16 rounded-2xl bg-gradient-to-t from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950" />
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  <span>09:30</span>
                  <span>11:00</span>
                  <span>13:00</span>
                  <span>15:30</span>
                  <span>16:00</span>
                </div>
              </div>
              <BuySellPanel symbol={activeSymbol} />
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:max-w-sm">
            <Watchlist />
            <AssetSummary symbol={activeSymbol} />
            <OrderFlowPanel symbol={activeSymbol} />
            <AlertsPanel />
          </aside>
        </div>

        <PositionsTable />
        <PerformanceChart />
      </main>
      {showProfile && <TraderProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default function Page() {
  return <Dashboard />;
}
