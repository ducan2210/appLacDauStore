import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Import axiosInstance
import {typeCart} from '@/models/cart.model';

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

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: [] as typeCart[],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;
