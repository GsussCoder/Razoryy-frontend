import { apiClient } from "./apiClient";

export const tenantsApi = {
  getAll: () => apiClient.get("/api/v1/tenants"),

  uploadLogo: (file) => {
    const formData = new FormData();

    formData.append("file", file);

    return apiClient.post("/api/v1/tenants/barbershop-logo", formData, true);
  },

  updateName: (barberName) =>
    apiClient.patch("/api/v1/tenants/barber-name", { barberName }),

  changeMembership: (id, membership) =>
    apiClient.patch(`/api/v1/tenants/${id}/membership`, { membership }),

  changeState: (id) => apiClient.patch(`/api/v1/tenants/${id}/state`),
};
