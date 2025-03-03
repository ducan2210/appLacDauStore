import {combineReducers} from 'redux';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import wishListReducer from './slices/wishListSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';
import notificationReducer from './slices/notificationSlice';
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  address: addressReducer,
  order: orderReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Định nghĩa kiểu RootState

export default rootReducer;
