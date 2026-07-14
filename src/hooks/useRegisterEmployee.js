import { useState } from "react";
import { usersApi } from "../services/usersApi";
import { useToast } from "../contexts/ToastContext";

export function useRegisterEmployee() {
  const { showSuccess, showError } = useToast();
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const register = async ({ name, number, email, password, payoutRate }) => {
    setRegistering(true);
    setRegisterError(null);

    try {
      const created = await usersApi.createBarber(
        name,
        number,
        email,
        password,
        payoutRate,
      );

      showSuccess("Barbero registrado correctamente.");

      return created;
    } catch (err) {
      setRegisterError(err.message);
      // showError(err.message);
      showError(
        "Tu plan actual permite 1 barbero activo. Desactiva otro barbero o mejora tu plan.",
      );
      throw err;
    } finally {
      setRegistering(false);
    }
  };

  return { register, registering, registerError };
}
