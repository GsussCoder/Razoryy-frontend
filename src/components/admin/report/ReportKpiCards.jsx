import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function ReportKpiCards({ balance, isLoading }) {
  const netValue = balance?.netBalance || 0;

  const cards = [
    {
      label: "Ingresos totales",
      value: balance?.totalRevenue,
      color: "text-emerald-400",
    },
    {
      label: "Gastos totales",
      value: balance?.totalExpenses,
      color: "text-red-400",
    },
    {
      label: "Total neto",
      value: netValue,
      color: netValue >= 0 ? "text-indigo-400" : "text-red-400",
    },
  ];

  return (
    <div id="kpi-reports-cards" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((s) => (
        <div
          key={s.label}
          className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex flex-col justify-between"
        >
          <p className="text-xs font-medium text-slate-400 truncate">
            {s.label}
          </p>
          <p className={`text-xl font-bold tracking-tight mt-1 ${s.color}`}>
            {isLoading ? "..." : formatCurrency(s.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
