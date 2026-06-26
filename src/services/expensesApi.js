import { apiClient } from './apiClient';

export const expensesApi = {
  getAll: () => apiClient.get('/api/expenses'),
  create: (data) => apiClient.post('/api/expenses', data),
};
