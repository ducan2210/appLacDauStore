import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from './apiURL';
import axiosInstance from './axiosInstance';

export const checkTokenValidity = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;
    const response = await axiosInstance.get('/VerifyToken');
    return response.data.valid;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data); // Log chi tiết lỗi từ backend
    }
    return false;
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/Login`, {
      username,
      password,
    });

    const token = response.data?.token;
    if (token) {
      await AsyncStorage.setItem('token', token); // Lưu token
      return response.data;
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    // throw error;
  }
};

export const loginWithGG = async (idToken: string): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/LoginWithGoogle`, {
      googleToken: idToken,
    });

    if (response) {
      await AsyncStorage.setItem('token', response.data?.token); // Lưu token
      return response.data;
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    // throw error;
  }
};

export const createUser = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const response = await axios.post(`${apiUrl}/CreateUsers`, {
      username,
      password,
      email,
    });
    const token = response.data.token;
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw new Error('Register failed');
  }
};

// Xóa token khi đăng xuất
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
