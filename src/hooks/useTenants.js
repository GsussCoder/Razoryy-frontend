import { useCallback, useContext, useEffect, useState } from "react";
import { tenantsApi } from "../services/tenantsApi";
import { authApi } from "../services/authApi";
import { useToast } from "../contexts/ToastContext";

export function useTenants() {
  const { showSuccess, showError } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await tenantsApi.getAll();

      setData(response);
    } catch (err) {
      setError(err.message || "Error al cargar empleados.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const changeState = async (id) => {
    setTogglingId(id);

    try {
      // BLINDAR PARA NO AUTO DESACTIVARSE
      await usersApi.changeUserState(id);
      await refetch();
      showSuccess("Estado del usuario cambiado correctamente.")
    } catch(err) {
      showError("Tu plan actual permite 2 usuarios activos. Desactiva o mejora tu plan.")
      // showError(err.message || "No se pudo cambiar el estado del empleado.");
    } finally {
      setTogglingId(null);
    }
  }

  return {
    refetch,
    changeState,
    data,
    isLoading,
    error,
    togglingId,
  };
}
