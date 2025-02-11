import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Import axiosInstance
import {typeAddress} from '@/models/address.model';

// Tạo action loadAddress để gọi API GetUser
export const loadAddress = createAsyncThunk(
  'address/GetAddress',
  async (user_id: number, {dispatch}) => {
    try {
      // Gọi API với axiosInstance, không cần phải thêm token thủ công
      const response = await axiosInstance.get(
        `${apiUrl}/GetAddressByUserId?user_id=${user_id}`,
      );

      response.data.map((address: typeAddress) => {
        if (address.is_default == 1) {
          dispatch(
            setOrderInformation(
              `Recipient name: ${address.full_name}, Phone: ${address.phone}, Address: ${address.address_line}, City: ${address.city}, State: ${address.state}, Postal Code: ${address.postal_code}`,
            ),
          );
        }
      });

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
    orderInformation: '',
  },
  reducers: {
    setOrderInformation: (state, action) => {
      state.orderInformation = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadAddress.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
  },
});

export const {setOrderInformation} = addressSlice.actions;
export default addressSlice.reducer;
