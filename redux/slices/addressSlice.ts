import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Import axiosInstance

// Tạo action loadAddress để gọi API GetUser
export const loadAddress = createAsyncThunk(
  'address/GetAddress',
  async (user_id: number) => {
    try {
      // Gọi API với axiosInstance, không cần phải thêm token thủ công
      const response = await axiosInstance.get(
        `${apiUrl}/GetAddressByUserId?user_id=${user_id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Xử lý lỗi
    }
  },
);

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState: {
    addresses: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAddress.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
  },
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
