// src/components/employee/EmployeeTickets.jsx
import { useState, useMemo } from "react";
import { Calendar, History } from "lucide-react"; // Icons
import { useTickets } from "../../hooks/tickets/useTickets";
import { useProcessedTickets } from "../../hooks/tickets/useProcessedTickets";
import DataTable from "../ui/DataTable";
import { TicketStatsBar } from "../tickets/TicketStatsBar";
import { getTicketColumns } from "../tickets/ticketColumns";

export default function EmployeeTickets() {
  const [viewMode, setViewMode] = useState("TODAY"); // "TODAY" o "HISTORIC"
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Pasamos el viewMode al hook para que el backend/filtro sepa si pedir lo de hoy o histórico
  const {
    tickets = [],
    pagination,
    stats,
    isLoading,
    isLoadingStats,
    mutatingId,
    completeTicket,
    cancelTicket,
    goToPage,
  } = useTickets(
    { activeFilter, typeFilter, viewMode }, // 👈 Incluimos viewMode
    { role: "EMPLOYEE" }
  );

  const { processedTickets, calculatedStats } = useProcessedTickets({
    tickets,
    pagination,
    backendStats: stats,
    viewMode,
    typeFilter,
    isLoading,
  });

  const columns = useMemo(
    () =>
      getTicketColumns({
        role: "EMPLOYEE",
        mutatingId,
        onComplete: (id) => completeTicket(id),
        onCancel: (id) => cancelTicket(id),
        onPay: null, // El empleado no cobra
      }),
    [mutatingId, completeTicket, cancelTicket]
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Encabezado y Tabs de Vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Mi Historial de Servicios</h2>
          <p className="text-slate-400 text-sm">Consulta el estado de tus cortes y turnos asignados</p>
        </div>

        {/* TABS DE HOY / HISTÓRICO */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setViewMode("TODAY")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "TODAY"
                ? "bg-slate-700 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Hoy</span>
          </button>

          <button
            onClick={() => setViewMode("HISTORIC")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "HISTORIC"
                ? "bg-slate-700 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Histórico</span>
          </button>
        </div>
      </div>

      {/* Métricas del barbero */}
      <TicketStatsBar 
        stats={calculatedStats} 
        isLoading={isLoadingStats} 
        viewMode={viewMode} 
      />

      {/* Tabla de tickets */}
      <DataTable
        serverSide={true}
        data={processedTickets}
        columns={columns}
        isLoading={isLoading}
        page={pagination.currentPage + 1}
        totalPage={pagination.totalPages}
        totalElements={pagination.totalElements}
        pageSize={pagination.pageSize}
        hasNext={pagination.hasNext}
        hasPrevious={pagination.hasPrevious}
        onPageChange={(newPage) => goToPage(newPage - 1)}
      />
    </div>
  );
}