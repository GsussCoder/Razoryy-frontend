import { useState, useEffect } from "react";
import { expensesApi } from "../services/expensesApi";
import { useToast } from "../contexts/ToastContext";

export function useExpenses() {
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await expensesApi.getAll();
      setData(response);
    } catch (err) {
      showToast("Error al cargar gastos", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refetch: fetchData };
}
