import { useCallback, useEffect, useState, useRef } from "react";
import { expensesApi } from "../services/expensesApi";
import { useToast } from "../contexts/ToastContext";

const EMPTY_PAGINATION = {
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 10,
  hasNext: false,
  hasPrevious: false,
};

export function useExpenses(filterParams = {}) {
  const { showSuccess, showError } = useToast();
  const { activeTab } = filterParams;
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const expensesCache = useRef({});

  const invalidateCache = useCallback(() => {
    expensesCache.current = {};
  }, []);

  useEffect(() => {
    invalidateCache();
    setPage(0);
  }, [activeTab, invalidateCache]);

  const refetch = useCallback(
    async (params = {}, forceFetch = false) => {
      const targetPage = params.page ?? page;
      const currentType = activeTab === "SALARY" ? "SALARY" : undefined;
      const cacheKey = `${targetPage}_${activeTab}`;

      if (!forceFetch && expensesCache.current[cacheKey]) {
        const cached = expensesCache.current[cacheKey];
        setExpenses(cached.expenses);
        setPagination(cached.pagination);
        return;
      }

      setIsLoading(true);

      try {
        const customParams = {
          page: targetPage,
          size: 10,
          type: currentType,
          ...params,
        };

        const response = await expensesApi.getAll(customParams);

        const newPagination = {
          currentPage: response.currentPage ?? 0,
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          pageSize: response.pageSize ?? 10,
          hasNext: !!response.hasNext,
          hasPrevious: !!response.hasPrevious,
        };

        expensesCache.current[cacheKey] = {
          expenses: response.expenses || [],
          pagination: newPagination,
        };

        setExpenses(response.expenses || []);
        setPagination(newPagination);
        setError("");
      } catch (err) {
        setError(err.message || "Error al cargar los egresos.");
      } finally {
        setIsLoading(false);
      }
    },
    [page, activeTab]
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const goToPage = (newPage) => {
    setPage(newPage);
  };

  const createExpense = async (expenseData) => {
    setIsCreating(true);
    try {
      const response = await expensesApi.create(expenseData);
      showSuccess(
        expenseData.expenseType === "SALARY"
          ? "Pago de salario registrado exitosamente."
          : "Gasto operacional registrado."
      );
      invalidateCache();
      await refetch({}, true);

      return response;
    } catch (err) {
      showError(err.message || "No se pudo registrar el gasto.");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    expenses,
    pagination,
    page,
    isLoading,
    isCreating,
    error,
    refetch,
    goToPage,
    createExpense,
  };
}