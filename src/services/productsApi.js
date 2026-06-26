import { apiClient } from './apiClient';

export const productsApi = {
  getAll: () => apiClient.get('/api/products'),
  create: (data) => apiClient.post('/api/products', data),
  update: (id, data) => apiClient.patch(`/api/products/${id}`, data),
  delete: (id) => apiClient.delete(`/api/products/${id}`),
};
