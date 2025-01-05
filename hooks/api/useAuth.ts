import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from './apiURL';
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
    throw error;
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
    console.error('Register failed:', error);
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
