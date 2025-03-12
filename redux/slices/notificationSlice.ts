import {typeUser} from './../../models/user.model'; // Có thể không cần nếu không dùng
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {typeCart} from '@/models/cart.model';
import axios from 'axios';
import {typeNotification} from '@/models/notification.model';

// Tạo action loadCalculateCartTotal để lấy tổng giá tiền
export const loadNotification = createAsyncThunk(
  'notification/loadNotification',
  async (userid: number, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${apiUrl}/GetNotificationByUserID?user_id=${userid}`,
      );
      return response.data.notifications as typeNotification[];
    } catch (error) {
      console.error('Error fetching notifications data:', error);
      throw error;
    }
  },
);

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    notifications: [] as typeNotification[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    clearNotifications: state => {
      state.notifications = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadNotification.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(loadNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setNotifications, clearNotifications} = notificationSlice.actions;
export default notificationSlice.reducer;
