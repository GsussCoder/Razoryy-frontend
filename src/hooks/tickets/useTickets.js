import { useCallback, useEffect, useState, useRef } from "react";
import { ticketsApi } from "../../services/ticketsApi";
import { useToast } from "../../contexts/ToastContext";

const EMPTY_PAGINATION = {
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 8,
  hasNext: false,
  hasPrevious: false,
};

export function useTickets(filterParams = {}, options = {}) {
  const { showSuccess, showError } = useToast();
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [page, setPage] = useState(0);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [error, setError] = useState("");
  const [mutatingId, setMutatingId] = useState(null);
  const [creating, setCreating] = useState(false);

  const role = options.role || "ADMIN";
  const { activeFilter, typeFilter } = filterParams;

  const ticketsCache = useRef({});
  const invalidateCache = useCallback(() => {
    ticketsCache.current = {};
  }, []);

  // Reinicia la paginación e invalida el caché al cambiar de filtros
  useEffect(() => {
    invalidateCache();
    setPage(0);
  }, [activeFilter, typeFilter, invalidateCache]);

  const refetch = useCallback(
    async (params = {}, forceFetch = false) => {
      const targetPage = params.page ?? page;
      const cacheKey = `${targetPage}_${activeFilter}_${typeFilter}_${role}`;

      if (!forceFetch && ticketsCache.current[cacheKey]) {
        const cached = ticketsCache.current[cacheKey];
        setTickets(cached.tickets);
        setPagination(cached.pagination);
        return;
      }

      setIsLoading(true);

      try {
        const customParams = {
          page: targetPage,
          size: 8,
          status: activeFilter !== "ALL" ? activeFilter : undefined,
          type: typeFilter !== "ALL" ? typeFilter : undefined,
          ...params,
        };

        const response =
          role === "EMPLOYEE"
            ? await ticketsApi.getMyTickets(customParams)
            : await ticketsApi.getAll(customParams);

        const newPagination = {
          currentPage: response.currentPage ?? 0,
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          pageSize: response.pageSize ?? 8,
          hasNext: !!response.hasNext,
          hasPrevious: !!response.hasPrevious,
        };

        ticketsCache.current[cacheKey] = {
          tickets: response.tickets || [],
          pagination: newPagination,
        };

        setTickets(response.tickets || []);
        setPagination(newPagination);
        setError("");
      } catch (err) {
        setError(err.message || "Error al cargar los tickets.");
      } finally {
        setIsLoading(false);
      }
    },
    [page, activeFilter, typeFilter, role],
  );

  const goToPage = (newPage) => {
    setPage(newPage);
  };

  const refetchStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const response =
        role === "EMPLOYEE"
          ? await ticketsApi.getMyStats()
          : await ticketsApi.getStats();

      setStats(response);
    } catch {
      // Error silencioso en la carga de estadísticas
    } finally {
      setIsLoadingStats(false);
    }
  }, [role]);

  useEffect(() => {
    refetchStats();
  }, [refetchStats]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  // --- Mutaciones ---

  const assignService = async (barberName, userId, serviceId) => {
    setCreating(true);
    try {
      await ticketsApi.assignService(userId, serviceId);
      showSuccess(`Servicio asignado a ${barberName}.`);
      invalidateCache();
      await Promise.all([refetch({}, true), refetchStats()]);
    } catch (err) {
      showError(err.message || "No se pudo asignar el servicio.");
      throw err;
    } finally {
      setCreating(false);
    }
  };

  const createFastTicket = async (boxId, barberServiceId, paymentType) => {
    setCreating(true);
    try {
      await ticketsApi.createFastTicket(boxId, barberServiceId, paymentType);
      showSuccess("Ticket rápido registrado y cobrado.");
      invalidateCache();
      await Promise.all([refetch({}, true), refetchStats()]);
    } catch (err) {
      showError(err.message || "No se pudo registrar el ticket rápido.");
      throw err;
    } finally {
      setCreating(false);
    }
  };

  const completeTicket = async (ticketId) => {
    setMutatingId(ticketId);
    try {
      await ticketsApi.completeTicket(ticketId);
      showSuccess("Servicio marcado como completado.");
      invalidateCache();
      await Promise.all([refetch({}, true), refetchStats()]);
    } catch (err) {
      showError(err.message || "No se pudo completar el servicio.");
      throw err;
    } finally {
      setMutatingId(null);
    }
  };

  const payTicket = async (ticketId, boxId, paymentType) => {
    setMutatingId(ticketId);
    try {
      await ticketsApi.payTicket(ticketId, boxId, paymentType);
      showSuccess("Pago registrado correctamente.");
      invalidateCache();
      await Promise.all([refetch({}, true), refetchStats()]);
    } catch (err) {
      showError(err.message || "No se pudo registrar el pago.");
      throw err;
    } finally {
      setMutatingId(null);
    }
  };

  const cancelTicket = async (ticketId) => {
    setMutatingId(ticketId);
    try {
      await ticketsApi.cancelTicket(ticketId);
      showSuccess("Ticket cancelado.");
      invalidateCache();
      await Promise.all([refetch({}, true), refetchStats()]);
    } catch (err) {
      showError(err.message || "No se pudo cancelar el ticket.");
      throw err;
    } finally {
      setMutatingId(null);
    }
  };

  return {
    tickets,
    pagination,
    page,
    stats,
    isLoading,
    isLoadingStats,
    error,
    mutatingId,
    creating,
    refetch,
    refetchStats,
    assignService,
    createFastTicket,
    completeTicket,
    payTicket,
    cancelTicket,
    goToPage,
  };
}
