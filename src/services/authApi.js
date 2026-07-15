import { apiClient } from "./apiClient";

export const authApi = {
  login: (email, password) =>
    apiClient.post("/api/auth/login", { email, password }),
  register: (
    barberName,
    locationData,
    membership,
    name,
    number,
    email,
    password,
  ) =>
    apiClient.post("/api/auth/register", {
      barberName,
      locationData,
      membership,
      name,
      number,
      email,
      password,
    }),
};
