type AlertItem = {
  id: number;
  title: string;
  detail: string;
  type: "price" | "system";
  state: "active" | "triggered";
  time: string;
};

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "AAPL crosses 420.00",
    detail: "Price crossed above key intraday level.",
    type: "price",
    state: "triggered",
    time: "13:14:22",
  },
  {
    id: 2,
    title: "Portfolio VAR within limits",
    detail: "Current 1D VAR at 1.80% of equity.",
    type: "system",
    state: "active",
    time: "12:58:03",
  },
  {
    id: 3,
    title: "NVDA volatility spike",
    detail: "1m realized volatility > 35%.",
    type: "system",
    state: "active",
    time: "12:46:10",
  },
];

export function AlertsPanel() {
  return (
    <div className="rounded-3xl bg-white/90 p-4 card-elevated dark:bg-slate-900/90">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="font-semibold text-slate-900 dark:text-slate-50">
          Alerts & System
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>All systems normal</span>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="mb-0.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    alert.state === "active"
                      ? "bg-amber-400"
                      : "bg-emerald-400"
                  }`}
                />
                <span className="text-[11px] font-medium text-slate-900 dark:text-slate-50">
                  {alert.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {alert.time}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {alert.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

