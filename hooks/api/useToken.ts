import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token; // Nếu không có, sẽ tự động trả null
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};
