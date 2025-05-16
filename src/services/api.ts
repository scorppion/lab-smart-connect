
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const servicesApi = {
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
  list: () => api.get('/services')
};

export const clientsApi = {
  create: (data: any) => api.post('/clients', data),
  update: (id: string, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: string) => api.delete(`/clients/${id}`),
  list: () => api.get('/clients')
};

export const appointmentsApi = {
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
  list: () => api.get('/appointments')
};

export const usersApi = {
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  list: () => api.get('/users')
};

export default api;
