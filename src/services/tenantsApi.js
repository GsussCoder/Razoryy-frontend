import { apiClient } from "./apiClient";

export const tenantsApi = {
  getAll: () => apiClient.get("/api/tenants"),

  create: (barberName, memberShip, memberShipPrice) =>
    apiClient.post("/api/tenants", { barberName, memberShip, memberShipPrice }),

  updateName: (barberName) => apiClient.patch('/api/tenants/barber-name', { barberName }),

  changeMembership: (id, membership) => {
    console.warn(
      "TODO: PATCH /api/tenants/{id}/membership no existe aún. Usando mock local.",
    );
    return Promise.resolve({
      message: `Tenant ${id} actualizado a ${membership}`,
    });
  },
  changeState: (id, isActive) => {
    console.warn(
      "TODO: PATCH /api/tenants/{id}/state no existe aún. Usando mock local.",
    );
    return Promise.resolve({
      message: `Tenant ${id} ${isActive ? "activado" : "desactivado"}`,
    });
  },
};
