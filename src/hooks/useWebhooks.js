import { useCallback, useEffect, useState } from "react";
import { webhooksApi } from "../services/webhooksApi";
import { useAuth } from "../contexts/AuthContext";

export function useWebhooks() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const connectTelegram = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await webhooksApi.linkConnectTelegram();
      
      window.open(response, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err.message || "Error al generar el enlace de Telegram.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkTelegramStatus = useCallback(async () => {
    try {
      const isConnected = await webhooksApi.isConnected();
      if (isConnected) {
        updateUser({ telegramConnected: true });
      }
    } catch (err) {
      console.error("Error al verificar estado de Telegram:", err);
    }
  }, [updateUser]);

  useEffect(() => {
    if (user?.telegramConnected) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkTelegramStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user?.telegramConnected, checkTelegramStatus]);

  return { connectTelegram, isLoading, error };
}
