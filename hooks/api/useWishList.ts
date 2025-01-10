import {loadWishList} from '@/redux/slices/wishListSlice';
import {apiUrl} from './apiURL';
import axiosInstance from './axiosInstance';

export const addToWishList = async (
  dispatch: any,
  user_id: number,
  product_id: number,
) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/AddToWishList`, {
      user_id,
      product_id,
    });

    dispatch(loadWishList(user_id));
    return response.data;
  } catch (error) {
    console.error('Add failed:', error);
    throw new Error('Add failed');
  }
};
