const TODAY_CONFIG = [
  { key: "today", label: "Servicios de Hoy", color: "text-indigo-400" },
  { key: "todayAssigned", label: "En proceso", color: "text-blue-400" },
  { key: "todayCompleted", label: "Por cobrar", color: "text-yellow-400" },
  { key: "todayPaid", label: "Pagados", color: "text-emerald-400" },
  { key: "todayCancelled", label: "Cancelados", color: "text-red-400" },
];

const HISTORY_CONFIG = [
  { key: "total", label: "Total Histórico", color: "text-indigo-400" },
  { key: "assigned", label: "En proceso", color: "text-blue-400" },
  { key: "completed", label: "Por cobrar", color: "text-yellow-400" },
  { key: "paid", label: "Pagados", color: "text-emerald-400" },
  { key: "cancelled", label: "Cancelados", color: "text-red-400" },
];

export function TicketStatsBar({ stats, isLoading, viewMode = "ACTIVE" }) {
  const config = viewMode === "ACTIVE" ? TODAY_CONFIG : HISTORY_CONFIG;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
      {config.map((s) => {
        const count = stats ? (stats[s.key] ?? 0) : 0;
        return (
          <div
            key={s.key}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex flex-col justify-between"
          >
            <p className="text-xs font-medium text-slate-400 truncate">
              {s.label}
            </p>
            <p className={`text-xl font-bold tracking-tight mt-1 ${s.color}`}>
              {isLoading ? "..." : count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
