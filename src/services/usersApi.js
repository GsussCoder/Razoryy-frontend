import { apiClient } from "./apiClient";

export const usersApi = {
  getAll: () => apiClient.get("/api/users"),
  createBarber: (name, number, email, password, payoutRate) =>
    apiClient.post("/api/users", { name, number, email, password, payoutRate }),
  getAllUsers: () => apiClient.get("/api/users/all"),
  changePassword: (password) =>
    apiClient.patch("/api/users/change-password", { password }),
  changeUserState: (id) => apiClient.patch(`/api/users/${id}/change-state`),
};
