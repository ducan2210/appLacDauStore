import {Alert} from 'react-native';
import {apiUrl} from './apiURL';
import axiosInstance from './axiosInstance';
import {typeCart} from '@/models/cart.model';
import {createOrderItem} from './useOrderItem';
import {router} from 'expo-router';
import {deleteItemInCartAfterCheckOut} from './useCart';

export const createOrder = async (
  cart: typeCart[],
  dispatch: any,
  user_id: number,
  total_amount: number,
  order_information: string,
  discount_applied: string,
  payment_method_id: number,
) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/CreateOrder`, {
      user_id: user_id,
      total_amount: total_amount,
      order_information: order_information,
      discount_applied: discount_applied,
      payment_method_id: payment_method_id,
    });

    cart.map(cart => {
      if (cart.status == 1) {
        createOrderItem(
          dispatch,
          response.data.order.order_id,
          cart.product_id,
          cart.quantity,
        );
        deleteItemInCartAfterCheckOut(dispatch, user_id, cart.cart_id);
      }
    });

    router.push('/moreScreen/order/success');

    return response.data;
  } catch (error) {
    console.error('Create failed:', error);
    throw new Error('Create failed');
  }
};
