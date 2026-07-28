import { apiClient } from './apiClient';

function buildQuery(params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return query ? `?${query}` : "";
}

export const expensesApi = {
  getAll: (params = {}) => apiClient.get(`/api/v1/expenses${buildQuery(params)}`),
  create: (data) => apiClient.post('/api/v1/expenses', data),
};
