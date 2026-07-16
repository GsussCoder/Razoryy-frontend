import { useState, useEffect } from "react";
import { boxesApi } from "../../services/boxesApi";
import { useToast } from "../../contexts/ToastContext";

export function useBoxes() {
  const { showSuccess, showError } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [boxIsLoading, setBoxIsLoading] = useState(false);
  const [closeIsLoading, setCloseIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await boxesApi.getAll();
      
      setData(response);
    } catch (err) {
      showError("Error al cargar cajas. ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openBox = async () => {
    setBoxIsLoading(true);

    try {
      const response = await boxesApi.open();

      showSuccess("La caja se ha abierto exitosamente.");
    } catch (err) {
      showError("No se pudo abrir la caja");
      console.log("Open error: ", err);
    } finally {
      setBoxIsLoading(false);
    }
  };

  const closeBox = async (id, actualCash) => {
    setCloseIsLoading(true);

    try {
      const response = await boxesApi.close(id, actualCash);

      showSuccess("Caja cerrada correctamente.");
    } catch(err) {
      showError("No se pudo cerrar la caja");
      console.log("Close error: ", err)
    } finally {
      setCloseIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, boxIsLoading, closeIsLoading, refetch: fetchData, openBox, closeBox };
}
