import {combineReducers} from 'redux';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Định nghĩa kiểu RootState

export default rootReducer;
