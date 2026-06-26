import { useState } from "react";
import { authApi } from "../services/authApi";
import { useToast } from "../contexts/ToastContext";

export function useRegisterEmployee() {
  const { showSuccess, showError } = useToast();
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const register = async ({ tenantId, name, user, password, role, payoutRate, isActive }) => {
    setRegistering(true);
    setRegisterError(null);

    try {
      const created = await authApi.register({
        tenantId,
        name,
        user,
        password,
        role,
        payoutRate,
        isActive
      });

      showSuccess("Usuario registrado correctamente.")
      
      return created;
    } catch (err) {
      setRegisterError(err.message);
      // showError(err.message);
      showError("Tu plan actual permite 2 usuarios activos. Desactiva o mejora tu plan.");
      throw err;
    } finally {
      setRegistering(false);
    }
  };

  return { register, registering, registerError };
}