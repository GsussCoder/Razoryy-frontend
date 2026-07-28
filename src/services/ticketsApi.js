import { apiClient } from "./apiClient";

function buildQuery(params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return query ? `?${query}` : "";
}

export const ticketsApi = {
  getAll: (params = {}) =>
    apiClient.get(`/api/v1/tickets${buildQuery(params)}`),
  getStats: () => apiClient.get(`/api/v1/tickets/stats`),
  getMyTickets: (params = {}) =>
    apiClient.get(`/api/v1/tickets/me${buildQuery(params)}`),
  getMyStats: () => apiClient.get("/api/v1/tickets/me/stats"),
  getTicket: (ticketId) => apiClient.get(`/api/v1/tickets/${ticketId}`),
  createFastTicket: (boxId, barberServiceId, paymentType) =>
    apiClient.post("/api/v1/tickets", { boxId, barberServiceId, paymentType }),
  assignService: (userId, serviceId) =>
    apiClient.post(`/api/v1/tickets/${userId}/assign`, serviceId),
  completeTicket: (ticketId) =>
    apiClient.patch(`/api/v1/tickets/${ticketId}/completed`),
  payTicket: (ticketId, boxId, paymentType) =>
    apiClient.patch(`/api/v1/tickets/${ticketId}/paid`, { boxId, paymentType }),
  cancelTicket: (ticketId) =>
    apiClient.patch(`/api/v1/tickets/${ticketId}/cancel`),
};
