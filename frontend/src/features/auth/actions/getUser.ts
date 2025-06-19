import API from '@/api/apiClient';

export const getUser = async () => API.get('/user');
