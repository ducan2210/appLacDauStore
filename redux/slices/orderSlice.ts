import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {typeOrder} from '@/models/order.model';
import axios from 'axios';

export const loadOrder = createAsyncThunk(
  'order/GetOrder',
  async (user_id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/GetOrderByUserId?user_id=${user_id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching order data:', error);
      throw error; // Xử lý lỗi
    }
  },
);

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orders: [] as typeOrder[],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {setOrders} = orderSlice.actions;
export default orderSlice.reducer;
