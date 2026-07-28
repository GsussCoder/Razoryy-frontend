import { useState, useEffect, useCallback } from "react";
import { ticketsApi } from "../../services/ticketsApi";

export function useTicketStats(params = {}) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const serializedParams = JSON.stringify(params);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ticketsApi.getStats(params);
      setStats(response.data || response);
    } catch (err) {
      setError(err?.message || "Error al cargar estadísticas");
    } finally {
      setIsLoading(false);
    }
  }, [serializedParams]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetchStats: fetchStats };
}
