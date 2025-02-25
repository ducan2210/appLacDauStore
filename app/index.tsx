import {StyleSheet, View, Image, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {router} from 'expo-router';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@/redux/store';
import {loadUser} from '@/redux/slices/userSlice';
import {loadCart, loadCalculateCartTotal} from '@/redux/slices/cartSlice';
import {loadWishList} from '@/redux/slices/wishListSlice';
import {loadAddress} from '@/redux/slices/addressSlice';
import {loadOrder} from '@/redux/slices/orderSlice';
import {logoutUser} from '@/redux/slices/userSlice';
import {clearCart} from '@/redux/slices/cartSlice';
import {clearWishList} from '@/redux/slices/wishListSlice';
import {clearAddress} from '@/redux/slices/addressSlice';
import {clearOrder} from '@/redux/slices/orderSlice';
import {checkTokenValidity} from '@/hooks/api/useAuth';
import axiosInstance from '@/hooks/api/axiosInstance';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'; // Thêm import axios

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token from AsyncStorage:', token);
        if (!token) {
          router.replace('/entry/LoginUI');
          return;
        }

        const isValid = await checkTokenValidity();
        console.log('Token validity:', isValid);
        if (isValid) {
          const decoded: any = jwtDecode(token);
          console.log('Decoded token:', decoded);

          const response = await axiosInstance.get(
            `/GetUser?username=${decoded.username}`,
          );
          const user = response.data;

          dispatch(loadUser(user.username));
          dispatch(loadCart(user.user_id));
          dispatch(loadCalculateCartTotal(user.user_id));
          dispatch(loadWishList(user.user_id));
          dispatch(loadAddress(user.user_id));
          dispatch(loadOrder(user.user_id));

          router.replace('/(tabs)/home');
        } else {
          dispatch(logoutUser());
          dispatch(clearCart());
          dispatch(clearWishList());
          dispatch(clearAddress());
          dispatch(clearOrder());
          Alert.alert(
            'Session Expired',
            'Your session has expired. Please log in again.',
          );
          router.replace('/entry/LoginUI');
        }
      } catch (error: unknown) {
        // Khai báo error là unknown
        console.error('Error during auth check:', error);
        if (axios.isAxiosError(error)) {
          // Kiểm tra kiểu an toàn
          console.error('Axios error details:', error.response?.data);
        }
        dispatch(logoutUser());
        dispatch(clearCart());
        dispatch(clearWishList());
        dispatch(clearAddress());
        dispatch(clearOrder());
        if (error instanceof Error && error.message === 'Session expired') {
          Alert.alert(
            'Session Expired',
            'Your session has expired. Please log in again.',
          );
        } else {
          Alert.alert('Error', 'An error occurred. Please try again.');
        }
        router.replace('/entry/LoginUI');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndNavigate();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          style={{height: hp(20), width: hp(20), borderRadius: wp(7)}}
          source={require('../assets/images/avt.jpg')}
        />
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={{marginTop: hp(2)}}
        />
      </View>
    );
  }

  return null;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#40BFFF',
  },
});
