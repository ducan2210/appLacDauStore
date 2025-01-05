import axiosInstance from './axiosInstance';
import {loadUser} from '@/redux/slices/userSlice';

export const updateUser = async (
  query: string,
  data: object,
  dispatch: any,
) => {
  try {
    const response = await axiosInstance.put(
      `/UpdateUser?username=${query}`,
      data,
    );

    dispatch(loadUser(query)); // Cập nhật Redux store
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user: ' + error);
  }
};
