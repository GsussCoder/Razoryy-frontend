import { useState } from "react";
import { usersApi } from "../services/usersApi";
import { useToast } from "../contexts/ToastContext";

export function useChangePassword() {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async (password) => {
    setLoading(true);
    setError(null);
    try {
      await usersApi.changePassword(password);
      showSuccess("Contraseña actualizada correctamente");
    } catch (err) {
      setError(err.message || "No se pudo cambiar la contraseña");
      showError(err.message || "No se pudo cambiar la contraseña");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, setError };
}