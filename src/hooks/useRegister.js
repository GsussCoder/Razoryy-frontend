import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { authApi } from "../services/authApi";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (
    barberName,
    locationData,
    membership,
    name,
    number,
    email,
    password,
  ) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.register(
        barberName,
        locationData,
        membership,
        name,
        number,
        email,
        password,
      );
    } catch (err) {
        setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
