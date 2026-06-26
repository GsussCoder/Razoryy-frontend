import { useState } from "react";
import { tenantsApi } from "../services/tenantsApi";
import { useToast } from "../contexts/ToastContext";

export function useRegisterTenant() {
  const { showSuccess, showError } = useToast();
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const register = async ({ barberName, memberShip, memberShipPrice }) => {
    setRegistering(true);
    setRegisterError(null);

    try {
      const created = await tenantsApi.create(
        barberName,
        memberShip,
        memberShipPrice,
      );

      showSuccess(`La barbería ${barberName} ha sido creada.`);

      return created;
    } catch (err) {
      setRegisterError(err.message);
      // showError(err.message);
      showError(err.message);
      throw err;
    } finally {
      setRegistering(false);
    }
  };

  return { register, registering, registerError };
}
