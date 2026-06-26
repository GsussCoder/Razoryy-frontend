import { apiClient } from './apiClient';

export const usersApi = {
  getAll: () => apiClient.get('/api/users'),
  getAllUsers: () => apiClient.get('/api/users/all'),
  changePassword: (password) => apiClient.patch('/api/users/changePassword', { password }),
  changeUserState: (id) => apiClient.patch(`/api/users/changeUserState/${id}`),
};
