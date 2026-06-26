import { apiClient } from './apiClient';

export const paymentsApi = {
  getAll: () => apiClient.get('/api/payments'),
  getCurrentUser: () => apiClient.get('/api/payments/currentUser'),
  getByUserId: (userId) => apiClient.get(`/api/payments/${userId}`),
  create: (data) => apiClient.post('/api/payments', data),
};
