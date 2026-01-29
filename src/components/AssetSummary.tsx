type Props = {
  symbol: string;
};

export function AssetSummary({ symbol }: Props) {
  return (
    <div className="rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Asset overview
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {symbol} • Apple Inc.
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
          Market Open
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <div>
          <div>Open</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            418.60
          </div>
        </div>
        <div>
          <div>High</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            425.20
          </div>
        </div>
        <div>
          <div>Low</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            414.90
          </div>
        </div>
        <div>
          <div>Volume</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            18.3M
          </div>
        </div>
        <div>
          <div>Market cap</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            $2.6T
          </div>
        </div>
        <div>
          <div>Beta (1Y)</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
            1.08
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-2 text-[11px] text-slate-500 dark:text-slate-300">
        <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-medium text-slate-700 dark:text-slate-100">
              Factor snapshot
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Mock analytics
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>1M Beta vs QQQ</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
                1.06
              </div>
            </div>
            <div>
              <div>Corr. vs NVDA</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
                0.74
              </div>
            </div>
            <div>
              <div>Rolling Sharpe</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
                1.32
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
          <div className="mb-1 font-medium text-slate-700 dark:text-slate-100">
            Session context
          </div>
          <p className="leading-relaxed">
            {symbol} trading inside prior day range with balanced participation
            from both systematic and discretionary flows.
          </p>
        </div>
      </div>
    </div>
  );
}

