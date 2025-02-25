import {typeUser} from './../../models/user.model'; // Có thể không cần nếu không dùng
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance';
import {typeAddress} from '@/models/address.model';

// Tạo action loadAddress để lấy danh sách địa chỉ
export const loadAddress = createAsyncThunk(
  'address/GetAddress',
  async (user_id: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetAddressByUserId?user_id=${user_id}`,
      );
      return response.data; // Trả về danh sách địa chỉ (typeAddress[])
    } catch (error) {
      console.error('Error fetching address data:', error);
      throw error;
    }
  },
);

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState: {
    addresses: [] as typeAddress[], // Rõ ràng kiểu typeAddress[]
    orderInformation: '',
    loading: false, // Thêm trạng thái loading
    error: null as string | null, // Thêm trạng thái lỗi
  },
  reducers: {
    setOrderInformation: (state, action) => {
      state.orderInformation = action.payload;
    },
    clearAddress: state => {
      // Thêm reducer để reset địa chỉ
      state.addresses = [];
      state.orderInformation = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        // Tìm địa chỉ mặc định và cập nhật orderInformation
        const defaultAddress = action.payload.find(
          (address: typeAddress) => address.is_default === 1,
        );
        if (defaultAddress) {
          state.orderInformation = `Recipient name: ${defaultAddress.full_name}, Phone: ${defaultAddress.phone}, Address: ${defaultAddress.address_line}, City: ${defaultAddress.city}, State: ${defaultAddress.state}, Postal Code: ${defaultAddress.postal_code}`;
        }
      })
      .addCase(loadAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setOrderInformation, clearAddress} = addressSlice.actions;
export default addressSlice.reducer;
