import {typeUser} from './../../models/user.model';
import {apiUrl} from '@/hooks/api/apiURL';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '@/hooks/api/axiosInstance';

export const loadUser = createAsyncThunk(
  'user/GetUser',
  async (username: string, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/GetUser?username=${username}`,
      );
      return response.data; // Trả về dữ liệu người dùng (object typeUser)
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null as typeUser | null, // Khởi tạo là null, khớp với trạng thái "chưa có user"
    image: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setUserAddress: (state, action) => {
      if (state.user) {
        state.user.address = action.payload;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload; // action.payload là typeUser object
      state.image = !!action.payload; // image = true nếu có user
    },
    logoutUser: state => {
      state.user = null; // Reset về null để biểu thị không có user
      state.image = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload; // Gán object typeUser từ API
        state.image = true;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setUserAddress, setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
