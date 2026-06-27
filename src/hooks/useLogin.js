import { useState } from "react";
import { authApi } from "../services/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useBranding } from "../contexts/BrandingContext";

export function useLogin() {
  const { login } = useAuth();
  const { setBarberName } = useBranding();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const doLogin = async (username, password) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await authApi.login(username, password);

      if (!response.isActive) {
        setError('Tu cuenta está desactivada. Contacta al administrador.');
        return false;
      }

      setBarberName(response.barberName);
      login(response);
      return true;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { doLogin, isLoading, error };
}