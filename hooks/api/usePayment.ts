import axios from 'axios';
import {apiUrl} from './apiURL';

export const createPaymentUrl = async (amount: number) => {
  try {
    const response = await axios.post(`${apiUrl}/CreatePaymentUrl`, {
      amount: amount * 100,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create payment url: ' + error);
  }
};
