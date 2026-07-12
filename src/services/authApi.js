import { apiClient } from './apiClient';

export const authApi = {
  login: (email, password) => apiClient.post('/api/auth/login', { email, password }),
  register: (data) => apiClient.post('/api/auth/register', data),
};
