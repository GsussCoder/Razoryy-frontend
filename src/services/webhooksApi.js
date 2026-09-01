import { apiClient } from "./apiClient";

export const webhooksApi = {
  linkConnectTelegram: () => apiClient.post("/api/v1/webhook/telegram/my-link"),
  isConnected: () => apiClient.get("/api/v1/webhook/telegram/is-connected"),
};