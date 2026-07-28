import { apiClient } from './apiClient';

export const appointmentsApi = {
  getAll: () => apiClient.get('/api/v1/appointments'),
  getMyAppointments: () => apiClient.get('/api/v1/appointments/me'),
  getByStatus: (status) => apiClient.get(`/api/v1/appointments/${status}`),
};