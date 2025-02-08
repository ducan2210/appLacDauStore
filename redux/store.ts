import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import {TypedUseSelectorHook, useDispatch} from 'react-redux';
import {RootState} from './rootReducer';
import cartReducer from './slices/cartSlice';
import wishListReducer from './slices/wishListSlice';
// Cấu hình store
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishList: wishListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo một hook dispatch có kiểu rõ ràng
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type {RootState};
export default store;
