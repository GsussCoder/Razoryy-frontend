import { useMemo } from "react";

const getLocalDateString = (dateInput) => {
  if (!dateInput) return null;
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function useProcessedTickets({
  tickets = [],
  pagination,
  backendStats,
  viewMode = "ACTIVE",
  startDate,
  endDate,
  typeFilter,
  isLoading,
}) {
  return useMemo(() => {
    const defaultStats = {
      today: 0,
      todayAssigned: 0,
      todayCompleted: 0,
      todayPaid: 0,
      todayCancelled: 0,
      total: 0,
      assigned: 0,
      completed: 0,
      paid: 0,
      cancelled: 0,
      futureAssignedAppointments: 0,
    };

    if (isLoading || !Array.isArray(tickets)) {
      return {
        processedTickets: [],
        calculatedStats: backendStats || defaultStats,
      };
    }

    const todayStr = getLocalDateString(new Date());

    // 1. Normalización de fechas e información básica
    const mappedTickets = tickets.map((ticket) => {
      let effectiveDate = ticket.createdAt;
      const type = ticket.ticketType || ticket.type;

      if (type === "APPOINTMENT" && ticket.appointmentDate) {
        const timePart = ticket.appointmentTime || "00:00:00";
        effectiveDate = `${ticket.appointmentDate}T${timePart}`;
      }

      return {
        ...ticket,
        effectiveDate,
      };
    });

    // 2. Procesamiento de tickets
    const processedTickets = mappedTickets.filter((ticket) => {
      // Si la API ya te envía los tickets paginados y filtrados por servidor, no los descartamos
      if (!startDate && !endDate && viewMode !== "ACTIVE") {
        return true;
      }

      const ticketDateStr = getLocalDateString(ticket.effectiveDate);
      if (!ticketDateStr) return true; // Si la fecha es indeterminada, preferimos mostrarlo

      const type = ticket.ticketType || ticket.type;

      // Restricción para vista ACTIVE (Solo aplica si hay filtrado local en clientes)
      if (viewMode === "ACTIVE") {
        if (type === "APPOINTMENT") {
          const isToday = ticketDateStr === todayStr;
          const isFutureAssigned =
            ticketDateStr > todayStr && ticket.serviceStatus === "ASSIGNED";
          return isToday || isFutureAssigned;
        }
        return ticketDateStr === todayStr;
      }

      // Restricción para vista HISTORY por rango de fecha
      if (startDate && ticketDateStr < startDate) return false;
      if (endDate && ticketDateStr > endDate) return false;

      return true;
    });

    const calculatedStats = backendStats
      ? { ...defaultStats, ...backendStats }
      : defaultStats;

    return { processedTickets, calculatedStats };
  }, [
    tickets,
    pagination,
    backendStats,
    viewMode,
    startDate,
    endDate,
    typeFilter,
    isLoading,
  ]);
}