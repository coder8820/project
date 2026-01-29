type Symbol = {
  symbol: string;
  name: string;
};

const symbols: Symbol[] = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "TSLA", name: "Tesla" },
];

type Props = {
  active: string;
  onChange: (symbol: string) => void;
};

export function SymbolTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-6 pb-3 pt-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
      {symbols.map((item) => {
        const isActive = item.symbol === active;
        return (
          <button
            key={item.symbol}
            onClick={() => onChange(item.symbol)}
            className={`rounded-full px-3 py-1 transition ${
              isActive
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-white dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span className="mr-1 text-[11px] tracking-wide">{item.symbol}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {item.name}
            </span>
          </button>
        );
      })}
      <span className="ml-auto text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
        Nasdaq Real-Time • USD
      </span>
    </div>
  );
}

