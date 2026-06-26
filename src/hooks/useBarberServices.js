// hooks/useBarberServices.js
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { barberServicesApi } from "../services/barberServicesApi";

export function useBarberServices() {
  const { showSuccess, showError } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await barberServicesApi.getAll();
      
      setData(response);
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar los servicios.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createService = async (serviceData) => {
    try {
      await barberServicesApi.create(serviceData);
      showSuccess("Servicio creado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al crear servicio");
      throw err;
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      await barberServicesApi.update(id, serviceData);
      showSuccess("Servicio actualizado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al actualizar servicio");
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      await barberServicesApi.delete(id);
      showSuccess("Servicio eliminado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al eliminar servicio");
      throw err;
    }
  };

  return { refetch, data, isLoading, error, createService, updateService, deleteService };
}