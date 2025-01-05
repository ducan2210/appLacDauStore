import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance'; // Import axiosInstance

// Tạo action loadUser để gọi API GetUser
export const loadUser = createAsyncThunk(
  'user/GetUser',
  async (username: string) => {
    try {
      // Gọi API với axiosInstance, không cần phải thêm token thủ công
      const response = await axiosInstance.get(
        `${apiUrl}/GetUser?username=${username}`,
      );
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Xử lý lỗi
    }
  },
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {} as typeUser,
    image: false,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.user.address = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.image = true;
    });
  },
});

export const {setUserAddress, setUser} = userSlice.actions;
export default userSlice.reducer;
