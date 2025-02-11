import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Import axiosInstance
import {typeCart} from '@/models/cart.model';
import axios from 'axios';

export const loadCart = createAsyncThunk(
  'cart/GetCart',
  async (userid: number) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetCartById?user_id=${userid}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      throw error; // Xử lý lỗi
    }
  },
);

export const loadCalculateCartTotal = createAsyncThunk(
  'cart/GetCalculateCartTotal',
  async (userid: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/GetCalculateCartTotal?user_id=${userid}`,
      );
      return response.data.total;
    } catch (error) {
      console.error('Error fetching total price data:', error);
      throw error; // Xử lý lỗi
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
  },
  extraReducers: builder => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(loadCalculateCartTotal.fulfilled, (state, action) => {
      state.totalPrice = action.payload;
    });
  },
});

export const {setCart, setDiscountApplied, setMoneyMustBePaid} =
  cartSlice.actions;
export default cartSlice.reducer;
