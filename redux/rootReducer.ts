import {combineReducers} from 'redux';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import wishListReducer from './slices/wishListSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishList: wishListReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Định nghĩa kiểu RootState

export default rootReducer;
