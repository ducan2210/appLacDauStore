import React, {useState} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {login} from '@/hooks/api/useAuth';
import {useAppDispatch} from '@/redux/store'; // Sử dụng useAppDispatch
import {loadUser} from '@/redux/slices/userSlice';
import {loadCalculateCartTotal, loadCart} from '@/redux/slices/cartSlice';
import {loadWishList} from '@/redux/slices/wishListSlice';
import {loadAddress} from '@/redux/slices/addressSlice';
import {loadOrder} from '@/redux/slices/orderSlice';
import {loadNotification} from '@/redux/slices/notificationSlice';

const BtnSignin = ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch(); // Dùng hook dispatch với kiểu rõ ràng

  const handleSignIn = async () => {
    try {
      setLoading(true); // Hiển thị trạng thái loading nếu cần
      const response = await login(userName, password);
      if (response && response.token) {
        dispatch(loadUser(userName)); // Gọi loadUser với username
        dispatch(loadCart(response.user.user_id));
        dispatch(loadCalculateCartTotal(response.user.user_id));
        dispatch(loadWishList(response.user.user_id));
        dispatch(loadAddress(response.user.user_id));
        dispatch(loadOrder(response.user.user_id));
        dispatch(loadNotification(response.user.user_id));
        // Xử lý đăng nhập thành công
        Alert.alert('Success', 'Logged in successfully!');
        // Điều hướng đến màn hình chính sau khi đăng nhập
        router.push('/(tabs)/home');
      } else {
        Alert.alert('Error', 'Invalid credentials or no token received.');
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  return (
    <TouchableOpacity
      style={styles.btnSignInNor}
      onPress={handleSignIn}
      disabled={loading} // Vô hiệu hóa nút khi đang loading
    >
      <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
        {loading ? 'Loading...' : 'Sign In'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSignInNor: {
    paddingVertical: hp(2),
    backgroundColor: '#40BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    width: wp(90),
  },
});

export default BtnSignin;
