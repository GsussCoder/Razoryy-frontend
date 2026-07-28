import { apiClient } from "./apiClient";

export const bookingApi = {
  getBarbershopBySlug: (slug) => apiClient.get(`/api/v1/tenants/${slug}`),
  getAvailableSlots: (barberId, userId, date) =>
    apiClient.get(
      `/api/v1/appointments/${barberId}/available-slots?userId=${userId}&date=${date}`,
    ),
  createAppointment: (barberId, payload) => apiClient.post(`/api/v1/appointments/${barberId}`, payload),
};
