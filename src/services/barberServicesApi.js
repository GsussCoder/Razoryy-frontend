import { apiClient } from './apiClient';

export const barberServicesApi = {
  getAll: () => apiClient.get('/api/barberServices'),
  create: (data) => apiClient.post('/api/barberServices', data),
  update: (id, data) => apiClient.patch(`/api/barberServices/${id}`, data),
  delete: (id) => apiClient.delete(`/api/barberServices/${id}`),
};
