import {Alert} from 'react-native';
import {apiUrl} from './apiURL';
import axiosInstance from './axiosInstance';
import {getProductById} from './useProduct';
import {getPromotionByProductID} from './usePromotion';

export const createOrderItem = async (
  dispatch: any,
  order_id: number,
  product_id: number,
  quantity: number,
) => {
  try {
    const product = await getProductById(product_id);
    const promotion = await getPromotionByProductID(product_id);
    const response = await axiosInstance.post(`${apiUrl}/CreateOrderItem`, {
      order_id: order_id,
      product_id: product_id,
      quantity: quantity,
      price: product.discount_price || product.price,
      discount: promotion.discount_percent || null,
    });
    return response.data;
  } catch (error) {
    console.error('Create failed:', error);
    throw new Error('Create failed');
  }
};
