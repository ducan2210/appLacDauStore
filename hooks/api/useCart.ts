import axios from 'axios';
import {apiUrl} from './apiURL';
import axiosInstance from './axiosInstance';
import {loadCart} from '@/redux/slices/cartSlice';
export const addToCart = async (
  dispatch: any,
  user_id: number,
  product_id: number,
  quantity: number,
) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/AddToCart`, {
      user_id,
      product_id,
      quantity,
    });
    dispatch(loadCart(user_id));
    return response.data;
  } catch (error) {
    console.error('Add failed:', error);
    throw new Error('Add failed');
  }
};

export const getCartById = async (user_id: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetCartById?user_id=${user_id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Add failed:', error);
    throw new Error('Add failed');
  }
};

export const deleteItemInCart = async (
  dispatch: any,
  user_id: number,
  product_id: number,
) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/DeleteItemInCart?user_id=${user_id}&&product_id=${product_id}`,
    );

    dispatch(loadCart(user_id));
    return response.data;
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Delete failed');
  }
};
