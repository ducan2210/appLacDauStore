import axios from 'axios';
import {apiUrl} from './apiURL';

export const getPromotionByProductID = async (product_id: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetPromotion?product_id=${product_id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Load failed:', error);
    throw new Error('Load failed');
  }
};

export const getPromotionByCode = async (code: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetPromotionByCode?code=${code}`,
    );
    return response.data;
  } catch (error) {
    console.error('Load failed:', error);
    throw new Error('Load failed');
  }
};
