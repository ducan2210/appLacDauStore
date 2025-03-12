import {apiUrl} from '@/hooks/api/apiURL';
import axiosInstance from '@/hooks/api/axiosInstance';
import {typeWishList} from '@/models/wishList';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loadWishList = createAsyncThunk(
  'wishList/GetWishList',
  async (user_id: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetWishListById?user_id=${user_id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching wish list:', error);
      throw error;
    }
  },
);

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    wishList: [] as typeWishList[],
    loading: false, // Thêm trạng thái loading
    error: null as string | null, // Thêm trạng thái lỗi
  },
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    clearWishList: state => {
      // Thêm reducer để reset wishlist
      state.wishList = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadWishList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWishList.fulfilled, (state, action) => {
        state.wishList = action.payload;
        state.loading = false;
      })
      .addCase(loadWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setWishList, clearWishList} = wishListSlice.actions;
export default wishListSlice.reducer;
