import axios from 'axios';
import {apiUrl} from './apiURL';
import {typeNotification} from '@/models/notification.model';

export const getNotificationByUserID = async (user_id: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetNotificationByUserID?user_id=${user_id}`,
    );
    return response.data.notifications as typeNotification[];
  } catch (error) {
    throw new Error('Failed to find notification ' + error);
  }
};
