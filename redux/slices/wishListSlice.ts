import {apiUrl} from '@/hooks/api/apiURL';
import axiosInstance from '@/hooks/api/axiosInstance';
import {typeWishList} from '@/models/wishList';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loadWishList = createAsyncThunk(
  'loadWishList',
  async (user_id: number) => {
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
  },
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadWishList.fulfilled, (state, action) => {
      state.wishList = action.payload;
    });
  },
});

export const {setWishList} = wishListSlice.actions;
export default wishListSlice.reducer;
