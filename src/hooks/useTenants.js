import { useCallback, useEffect, useState } from "react";
import { tenantsApi } from "../services/tenantsApi";
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
      setError(err.message || "Error al cargar las barberías.");
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
      await tenantsApi.changeState(id);
      await refetch();
      showSuccess("Estado de la barbería actualizado correctamente.");
    } catch (err) {
      showError(err.message || "No se pudo cambiar el estado de la barbería.");
    } finally {
      setTogglingId(null);
    }
  };

  const changeMembership = async (id, membership) => {
    try {
      await tenantsApi.changeMembership(id, membership);
      await refetch();
      showSuccess("Membresía actualizada correctamente.");
    } catch (err) {
      showError(err.message || "No se pudo actualizar la membresía.");
      throw err;
    }
  };

  return {
    refetch,
    changeState,
    changeMembership,
    data,
    isLoading,
    error,
    togglingId,
  };
}
