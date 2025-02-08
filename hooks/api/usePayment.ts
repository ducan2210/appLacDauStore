import axios from 'axios';
import {apiUrl} from './apiURL';

export const createPaymentUrl = async () => {
  try {
    const response = await axios.post(`${apiUrl}/CreatePaymentUrl`, {
      amount: 100000,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create payment url: ' + error);
  }
};
