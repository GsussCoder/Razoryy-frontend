import { apiClient } from "./apiClient";

function buildQuery(params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return query ? `?${query}` : "";
}

export const reportsApi = {
  getBoxReport: (boxId) => 
    apiClient.get(`/api/v1/reports/box/${boxId}`),

  getRevenueReport: (params = {}) => 
    apiClient.get(`/api/v1/reports/revenue${buildQuery(params)}`),

  getBalanceReport: (params = {}) => 
    apiClient.get(`/api/v1/reports/balance${buildQuery(params)}`),

  getExpensesByCategoryReport: (params = {}) => 
    apiClient.get(`/api/v1/reports/expenses-by-category${buildQuery(params)}`),

  getBarberPerformanceReport: (params = {}) => 
    apiClient.get(`/api/v1/reports/barber-performance${buildQuery(params)}`),
};