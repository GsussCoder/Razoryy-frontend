import { apiClient } from './apiClient';

export const boxesApi = {
  getAll: () => apiClient.get('/api/v1/boxes'),
  open: () => apiClient.post('/api/v1/boxes'),
  close: (id, actualCash) => apiClient.patch(`/api/v1/boxes/${id}`, actualCash),
};
