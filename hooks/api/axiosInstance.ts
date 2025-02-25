// @/hooks/api/axiosInstance.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {apiUrl} from './apiURL';

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để gửi token
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Thêm interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Xóa token khi nhận lỗi 401
      await AsyncStorage.removeItem('token');
      // Ném lỗi để xử lý ở nơi gọi axiosInstance
      return Promise.reject(new Error('Session expired'));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
