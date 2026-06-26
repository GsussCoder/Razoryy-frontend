import { apiClient } from './apiClient';

export const appointmentsApi = {
  getAll: () => apiClient.get('/api/appointments'),
  getByStatus: (status) => apiClient.get(`/api/appointments/${status}`),
  create: (data) => apiClient.post('/api/appointments', data),
  confirm: (id) => apiClient.post(`/api/appointments/${id}/confirm`),
  cancel: (id) => apiClient.post(`/api/appointments/${id}/cancel`),
  complete: (id) => apiClient.post(`/api/appointments/${id}/complete`),
  update: (id, data) => apiClient.patch(`/api/appointments/${id}`, data),
};
