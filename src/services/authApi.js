import { apiClient } from './apiClient';

export const authApi = {
  login: (user, password) => apiClient.post('/api/auth/login', { user, password }),
  register: (data) => apiClient.post('/api/auth/register', data),
};
