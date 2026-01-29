type Position = {
  symbol: string;
  side: "Long" | "Short";
  size: number;
  entry: number;
  last: number;
  pnl: number;
  pnlPct: number;
  status: "Open" | "Working";
};

const positions: Position[] = [
  {
    symbol: "AAPL",
    side: "Long",
    size: 150,
    entry: 418.2,
    last: 420.5,
    pnl: 345.0,
    pnlPct: 0.82,
    status: "Open",
  },
  {
    symbol: "NVDA",
    side: "Short",
    size: 40,
    entry: 960.4,
    last: 952.1,
    pnl: 332.0,
    pnlPct: 0.97,
    status: "Open",
  },
  {
    symbol: "MSFT",
    side: "Long",
    size: 80,
    entry: 408.1,
    last: 412.3,
    pnl: 336.0,
    pnlPct: 0.82,
    status: "Working",
  },
];

const totals = positions.reduce(
  (acc, p) => {
    const notional = p.last * p.size;
    const signed = p.side === "Long" ? notional : -notional;
    acc.gross += Math.abs(notional);
    acc.net += signed;
    acc.pnl += p.pnl;
    return acc;
  },
  { gross: 0, net: 0, pnl: 0 },
);

export function PositionsTable() {
  return (
    <section className="mt-4 border-t border-slate-200/70 bg-white/90 px-4 py-3 text-xs dark:border-slate-800 dark:bg-slate-900/80 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Positions & Orders
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Live risk overview across active strategies
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Gross: ${totals.gross.toFixed(0)}
          </span>
          <span className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Net: {totals.net >= 0 ? "+" : "-"}${Math.abs(totals.net).toFixed(0)}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-semibold ${
              totals.pnl >= 0
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
                : "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
            }`}
          >
            P&L: {totals.pnl >= 0 ? "+" : "-"}${Math.abs(totals.pnl).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-1 text-[11px]">
          <thead>
            <tr className="text-left text-slate-400 dark:text-slate-500">
              <th className="px-2 py-1 font-medium">Symbol</th>
              <th className="px-2 py-1 font-medium">Side</th>
              <th className="px-2 py-1 font-medium text-right">Size</th>
              <th className="px-2 py-1 font-medium text-right">Entry</th>
              <th className="px-2 py-1 font-medium text-right">Last</th>
              <th className="px-2 py-1 font-medium text-right">P&L</th>
              <th className="px-2 py-1 font-medium text-right">P&L %</th>
              <th className="px-2 py-1 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => {
              const positive = pos.pnl >= 0;
              const pnlColor = positive
                ? "text-emerald-500"
                : "text-rose-500";
              const sideColor =
                pos.side === "Long" ? "text-emerald-600" : "text-rose-500";
              const statusColor =
                pos.status === "Open"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                  : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

              return (
                <tr key={pos.symbol}>
                  <td className="px-2 py-1.5">
                    <div className="rounded-xl bg-slate-50 px-2 py-1 text-[11px] font-semibold tracking-wide text-slate-900 dark:bg-slate-800 dark:text-slate-50">
                      {pos.symbol}
                    </div>
                  </td>
                  <td className="px-2 py-1.5">
                    <span className={`font-medium ${sideColor}`}>
                      {pos.side}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right text-slate-700 dark:text-slate-100">
                    {pos.size.toLocaleString()}
                  </td>
                  <td className="px-2 py-1.5 text-right text-slate-600 dark:text-slate-200">
                    {pos.entry.toFixed(2)}
                  </td>
                  <td className="px-2 py-1.5 text-right text-slate-600 dark:text-slate-200">
                    {pos.last.toFixed(2)}
                  </td>
                  <td className={`px-2 py-1.5 text-right font-semibold ${pnlColor}`}>
                    {positive ? "+" : "-"}${Math.abs(pos.pnl).toFixed(2)}
                  </td>
                  <td className={`px-2 py-1.5 text-right font-medium ${pnlColor}`}>
                    {positive ? "+" : "-"}
                    {Math.abs(pos.pnlPct).toFixed(2)}%
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <span
                      className={`inline-flex items-center justify-end rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor}`}
                    >
                      {pos.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

