import { apiClient } from "./apiClient";

export const bookingApi = {
  getBarbershopBySlug: (slug) => apiClient.get(`/api/v1/tenants/${slug}`),
  getAvailableSlots: (barberId, userId, businessServiceId, date) =>
    apiClient.get(
      `/api/v1/appointments/${barberId}/available-slots?userId=${userId}&businessServiceId=${businessServiceId}&date=${date}`,
    ),
  createAppointment: (barberId, payload) => apiClient.post(`/api/v1/appointments/${barberId}`, payload),
};
