type WatchItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
};

const data: WatchItem[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 420.5, change: 1.34 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 952.1, change: -0.82 },
  { symbol: "MSFT", name: "Microsoft", price: 412.3, change: 0.56 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 204.8, change: -2.14 },
  { symbol: "META", name: "Meta Platforms", price: 376.9, change: 0.92 },
];

export function Watchlist() {
  return (
    <div className="rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="font-semibold text-slate-900 dark:text-slate-50">
          Watchlist
        </div>
        <div className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          US Tech • 5 symbols
        </div>
      </div>
      <div className="space-y-1.5 text-xs">
        {data.map((item) => {
          const positive = item.change >= 0;
          const color = positive ? "text-emerald-500" : "text-rose-500";
          const bgDot = positive ? "bg-emerald-500" : "bg-rose-500";
          return (
            <button
              key={item.symbol}
              className="flex w-full items-center gap-3 rounded-2xl px-2.5 py-1.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${bgDot} shadow-[0_0_0_3px_rgba(148,163,184,0.35)]`}
              />
              <div className="w-14 text-[11px] font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                {item.symbol}
              </div>
              <div className="flex-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                {item.name}
              </div>
              <div className="text-right">
                <div className="text-[11px] font-medium text-slate-900 dark:text-slate-50">
                  {item.price.toFixed(2)}
                </div>
                <div className={`text-[10px] ${color}`}>
                  {positive ? "+" : ""}
                  {item.change.toFixed(2)}%
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

