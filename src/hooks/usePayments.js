import { useState, useEffect, useCallback, useContext } from "react";
import { paymentsApi } from "../services/paymentsApi";
import { useToast } from "../contexts/ToastContext";
import { AuthContext } from "../contexts/AuthContext";

export function usePayments() {
  const { showSuccess, showError } = useToast();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      let response;

      if (user.role === "admin") {
        response = await paymentsApi.getAll();
      } else {
        response = await paymentsApi.getCurrentUser();
      }

      setData(response);
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar los datos de pagos.");
      showError("Error al cargar los datos de pagos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createPayment = async (paymentData) => {
    try {
      const created = await paymentsApi.create(paymentData);

      showSuccess("Pago registrado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al registrar el pago");
      throw err;
    }
  };

  return { data, isLoading, error, refetch, createPayment };
}
