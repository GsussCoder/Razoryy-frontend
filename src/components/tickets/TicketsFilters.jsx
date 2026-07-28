import { Calendar, LayoutDashboard, History, Filter } from "lucide-react";

export const STATUS_TABS = [
  { value: "ALL", label: "Todos" },
  { value: "ASSIGNED", label: "En proceso" },
  { value: "COMPLETED", label: "Por cobrar" },
  { value: "PAID", label: "Pagados" },
  { value: "CANCELLED", label: "Cancelados" },
];

export const TICKET_TYPES = [
  { value: "ALL", label: "Todos los orígenes" },
  { value: "WALK_IN", label: "Turno directo" },
  { value: "APPOINTMENT", label: "Reserva de cita" },
  { value: "PRODUCT", label: "Venta de producto" },
];

export function TicketsFilters({
  viewMode,
  setViewMode,
  typeFilter,
  setTypeFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <div className="space-y-4 bg-slate-800 p-4 rounded-2xl border border-slate-700 backdrop-blur-md">
      {/* Vistas principales */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode("ACTIVE")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "ACTIVE"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Servicios de Hoy
          </button>
          <button
            onClick={() => setViewMode("HISTORY")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "HISTORY"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Historial General
          </button>
        </div>

        {/* Filtro por origen del ticket */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
          >
            {TICKET_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector de rango en Historial */}
      {viewMode === "HISTORY" && (
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            Filtrar por rango:
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="scheme-dark bg-slate-950 border border-slate-800 text-white rounded-lg text-xs px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-slate-600 text-xs">hasta</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="scheme-dark bg-slate-950 border border-slate-800 text-white rounded-lg text-xs px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          />
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="text-xs text-rose-400 hover:underline cursor-pointer ml-auto"
            >
              Limpiar fechas
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TableStatusActions({
  activeFilter,
  setActiveFilter,
  typeFilter,
  setTypeFilter,
  stats,
  isLoading,
}) {
  const futureAppointmentsCount = stats?.futureAssignedAppointments || 0;

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <div className="flex gap-1 flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800/80">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            disabled={isLoading}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === tab.value
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {setTypeFilter && (
        <button
          disabled={isLoading}
          onClick={() =>
            setTypeFilter(typeFilter === "APPOINTMENT" ? "ALL" : "APPOINTMENT")
          }
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
            typeFilter === "APPOINTMENT"
              ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
              : "bg-slate-950 text-purple-300 border-purple-900/50 hover:bg-purple-950/40"
          }`}
        >
          <span>Solo Reservas</span>
          {futureAppointmentsCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-200 rounded-full border border-purple-400/30">
              ({futureAppointmentsCount} futuras)
            </span>
          )}
        </button>
      )}
    </div>
  );
}
