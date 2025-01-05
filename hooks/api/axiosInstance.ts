import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native'; // Hiển thị thông báo cho người dùng
import {useRouter} from 'expo-router'; // import useRouter từ expo-router
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
  response => response, // Trả về dữ liệu bình thường nếu không có lỗi
  async error => {
    // Kiểm tra nếu lỗi là 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Hiển thị cảnh báo cho người dùng
      Alert.alert(
        'Phiên đăng nhập hết hạn',
        'Vui lòng đăng nhập lại để tiếp tục.',
        [
          {
            text: 'OK',
            onPress: async () => {
              // Xóa token khỏi AsyncStorage
              await AsyncStorage.removeItem('token');
              // Sử dụng useRouter để điều hướng
              const router = useRouter();
              router.push('/entry/LoginUI'); // Điều hướng đến trang đăng nhập
            },
          },
        ],
      );
    }
    return Promise.reject(error); // Tiếp tục xử lý lỗi cho các phần khác
  },
);

export default axiosInstance;
