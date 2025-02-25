import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Thay axios bằng axiosInstance
import {typeOrder} from '@/models/order.model';

// Tạo action loadOrder để lấy danh sách đơn hàng
export const loadOrder = createAsyncThunk(
  'order/GetOrder',
  async (user_id: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetOrderByUserId?user_id=${user_id}`,
      );
      return response.data; // Trả về danh sách đơn hàng (typeOrder[])
    } catch (error) {
      console.error('Error fetching order data:', error);
      throw error;
    }
  },
);

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orders: [] as typeOrder[],
    loading: false, // Thêm trạng thái loading
    error: null as string | null, // Thêm trạng thái lỗi
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrder: state => {
      // Thêm reducer để reset đơn hàng
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(loadOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setOrders, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
