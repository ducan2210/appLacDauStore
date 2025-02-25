import {typeUser} from './../../models/user.model'; // Có thể không cần nếu không dùng
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance';
import {typeCart} from '@/models/cart.model';

// Tạo action loadCart để lấy giỏ hàng
export const loadCart = createAsyncThunk(
  'cart/GetCart',
  async (userid: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetCartById?user_id=${userid}`,
      );
      return response.data; // Trả về danh sách giỏ hàng (typeCart[])
    } catch (error) {
      console.error('Error fetching cart data:', error);
      throw error;
    }
  },
);

// Tạo action loadCalculateCartTotal để lấy tổng giá tiền
export const loadCalculateCartTotal = createAsyncThunk(
  'cart/GetCalculateCartTotal',
  async (userid: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetCalculateCartTotal?user_id=${userid}`,
      );
      return response.data.total; // Trả về tổng giá
    } catch (error) {
      console.error('Error fetching total price data:', error);
      throw error;
    }
  },
);

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: [] as typeCart[],
    totalPrice: 0,
    moneyMustBePaid: 0,
    discountApplied: '',
    loading: false, // Thêm trạng thái loading
    error: null as string | null, // Thêm trạng thái lỗi
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setMoneyMustBePaid: (state, action) => {
      state.moneyMustBePaid = action.payload;
    },
    setDiscountApplied: (state, action) => {
      state.discountApplied = action.payload;
    },
    clearCart: state => {
      state.cart = [];
      state.totalPrice = 0;
      state.moneyMustBePaid = 0;
      state.discountApplied = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Xử lý loadCart
    builder
      .addCase(loadCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý loadCalculateCartTotal
      .addCase(loadCalculateCartTotal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCalculateCartTotal.fulfilled, (state, action) => {
        state.totalPrice = action.payload;
        state.loading = false;
      })
      .addCase(loadCalculateCartTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setCart, setMoneyMustBePaid, setDiscountApplied, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
