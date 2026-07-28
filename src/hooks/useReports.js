import { useCallback, useEffect, useState, useRef } from "react";
import { reportsApi } from "../services/reportsApi";
import { useToast } from "../contexts/ToastContext";

export function useReports(dateRange = {}) {
  const { showError } = useToast();

  // Estados de datos
  const [balance, setBalance] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [barbers, setBarbers] = useState(null);

  // Estados de consulta individual de Caja
  const [boxReport, setBoxReport] = useState(null);
  const [isLoadingBox, setIsLoadingBox] = useState(false);
  const [boxError, setBoxError] = useState("");

  // Estados de carga generales
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { startDate, endDate } = dateRange;

  // Cache para evitar peticiones repetidas con las mismas fechas
  const reportsCache = useRef({});

  const invalidateCache = useCallback(() => {
    reportsCache.current = {};
  }, []);

  // Carga paralela de reportes dentro del rango
  const refetch = useCallback(
    async (forceFetch = false) => {
      if (!startDate || !endDate) return;

      const cacheKey = `${startDate}_${endDate}`;

      if (!forceFetch && reportsCache.current[cacheKey]) {
        const cached = reportsCache.current[cacheKey];
        setBalance(cached.balance);
        setRevenue(cached.revenue);
        setExpenses(cached.expenses);
        setBarbers(cached.barbers);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const params = { startDate, endDate };

        const [balRes, revRes, expRes, barbRes] = await Promise.all([
          reportsApi.getBalanceReport(params),
          reportsApi.getRevenueReport(params),
          reportsApi.getExpensesByCategoryReport(params),
          reportsApi.getBarberPerformanceReport(params),
        ]);

        const data = {
          balance: balRes,
          revenue: revRes,
          expenses: expRes,
          barbers: barbRes,
        };

        reportsCache.current[cacheKey] = data;

        setBalance(balRes);
        setRevenue(revRes);
        setExpenses(expRes);
        setBarbers(barbRes);
      } catch (err) {
        const message = err.message || "Error al cargar los reportes.";
        setError(message);
        showError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [startDate, endDate, showError]
  );

  // Re-fetch cuando cambian las fechas
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Consulta manual de Caja por Box ID
  const fetchBoxReport = async (boxId) => {
    if (!boxId) return;

    setIsLoadingBox(true);
    setBoxError("");
    try {
      const response = await reportsApi.getBoxReport(boxId);
      setBoxReport(response);
      return response;
    } catch (err) {
      const msg = err.message || "No se encontró la caja con el ID proporcionado.";
      setBoxError(msg);
      setBoxReport(null);
    } finally {
      setIsLoadingBox(false);
    }
  };

  const clearBoxReport = () => {
    setBoxReport(null);
    setBoxError("");
  };

  return {
    balance,
    revenue,
    expenses,
    barbers,
    boxReport,
    isLoading,
    isLoadingBox,
    error,
    boxError,
    refetch,
    fetchBoxReport,
    clearBoxReport,
    invalidateCache,
  };
}