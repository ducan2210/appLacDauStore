import axios from 'axios';
import {apiUrl} from './apiURL';

export const getMessage = async (user_id: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/messages/getMessages?sender_id=${user_id}&&receiver_id=1`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed:', error);
    throw new Error('Failed');
  }
};

export const sendMessages = async (sender_id: number, content: string) => {
  try {
    const response = await axios.post(`${apiUrl}/messages/send`, {
      sender_id: sender_id,
      receiver_id: 1,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Failed:', error);
    throw new Error('Failed');
  }
};
