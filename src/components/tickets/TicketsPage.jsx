import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // 👈 Importamos contexto de auth
import { useTickets } from "../../hooks/tickets/useTickets";
import { useEmployees } from "../../hooks/useEmployees";
import { useBarberServices } from "../../hooks/useBarberServices";
import { useBoxes } from "../../hooks/boxes/useBoxes";
import { useProcessedTickets } from "../../hooks/tickets/useProcessedTickets";
import DataTable from "../ui/DataTable";
import { TicketStatsBar } from "./TicketStatsBar";
import { TicketFormModal } from "../modals/TicketFormModal";
import { PayTicketModal } from "../modals/PayTicketModal";
import { TicketsFilters, TableStatusActions } from "./TicketsFilters";
import { getTicketColumns } from "./TicketColumns";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createAssignsTour } from "../../tours/steps/assignsTour";

export default function AdminTickets() {
  const { user } = useAuth();

  const isEmployee = user?.role === "employee" || user?.role === "EMPLOYEE";
  const currentRole = isEmployee ? "EMPLOYEE" : "ADMIN";
  const isMobile = useBreakpoint();

  usePageTour("assigns", () => createAssignsTour({ role: user?.role, isMobile }));

  const [viewMode, setViewMode] = useState("ACTIVE");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    tickets = [],
    pagination,
    stats,
    isLoading = false,
    isLoadingStats,
    error,
    mutatingId,
    refetch,
    assignService,
    completeTicket,
    payTicket,
    cancelTicket,
    goToPage,
  } = useTickets(
    {
      activeFilter,
      typeFilter,
    },
    { role: currentRole }
  );
  const { data: users } = useEmployees();
  const { data: services } = useBarberServices();
  const { data: boxes = [] } = useBoxes();
  const [showFormModal, setShowFormModal] = useState(false);
  const [payingTicket, setPayingTicket] = useState(null);

  const currentBox = useMemo(() => boxes.find((b) => b.status === "OPEN") ?? null, [boxes]);

  const { processedTickets, calculatedStats } = useProcessedTickets({
    tickets,
    pagination,
    backendStats: stats,
    viewMode,
    startDate,
    endDate,
    typeFilter,
    isLoading,
  });

  const columns = useMemo(
    () =>
      getTicketColumns({
        role: currentRole,
        mutatingId,
        onComplete: (id) => completeTicket(id),
        onCancel: (id) => cancelTicket(id),
        onPay: (ticket) => setPayingTicket(ticket),
      }),
    [currentRole, mutatingId, completeTicket, cancelTicket]
  );

  return (
    <div id="panel-assigns" className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {isEmployee ? "Mi historial de servicios" : "Historial de servicios"}
          </h2>
          <p className="text-slate-400 text-sm">
            {isEmployee
              ? "Consulta y gestiona el estado de tus cortes de hoy y anteriores"
              : "Flujo de trabajo del día e historial de servicios"}
          </p>
        </div>

        {/* El botón de Asignar Corte SOLO se muestra para el Admin */}
        {!isEmployee && (
          <button
            id="assign-service-button"
            onClick={() => setShowFormModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Asignar corte
          </button>
        )}
      </div>

      <TicketsFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <TicketStatsBar stats={calculatedStats} isLoading={isLoadingStats} viewMode={viewMode} />

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
        onPageChange={(newPage1Based) => {
          goToPage(newPage1Based - 1);
        }}
        emptyMessage={
          isLoading
            ? "Cargando registros..."
            : viewMode === "ACTIVE"
            ? "No hay tickets ni citas agendadas para hoy"
            : "No hay registros en este rango de fechas"
        }
        actions={
          <TableStatusActions
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            stats={calculatedStats}
            isLoading={isLoading}
          />
        }
      />

      {/* Modales restringidos únicamente para la vista de ADMIN */}
      {!isEmployee && (
        <>
          <TicketFormModal
            isOpen={showFormModal}
            onClose={() => setShowFormModal(false)}
            onSuccess={refetch}
            users={users}
            services={services}
            onAssign={assignService}
          />

          <PayTicketModal
            isOpen={!!payingTicket}
            onClose={() => setPayingTicket(null)}
            ticket={payingTicket}
            openBox={currentBox}
            onConfirm={async (...args) => {
              await payTicket(...args);
            }}
          />
        </>
      )}
    </div>
  );
}