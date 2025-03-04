import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import CustomGoogleSigninButton from './CustomGoogleSigninButton';
import axios from 'axios'; // Thêm axios để gọi API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm AsyncStorage để lưu token
import {loginWithGG} from '@/hooks/api/useAuth';
import {useAppDispatch} from '@/redux/store';
import {loadUser} from '@/redux/slices/userSlice';
import {loadCalculateCartTotal, loadCart} from '@/redux/slices/cartSlice';
import {loadWishList} from '@/redux/slices/wishListSlice';
import {loadAddress} from '@/redux/slices/addressSlice';
import {loadOrder} from '@/redux/slices/orderSlice';
import {router} from 'expo-router';
import {loadNotification} from '@/redux/slices/notificationSlice';

const BtnLoginGG = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const dispatch = useAppDispatch();
  GoogleSignin.configure({
    webClientId:
      '629627177990-9ne7td287mpqrvqn34kkss8p8ljfdhr2.apps.googleusercontent.com',
  });

  const signIn = async () => {
    try {
      // Kiểm tra Google Play Services
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Đăng nhập bằng Google
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        console.error('ID token is missing or invalid.');
        return;
      }

      // Đăng nhập vào Firebase (tùy chọn, nếu bạn vẫn muốn dùng Firebase)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // Gửi idToken đến backend để lấy token của bạn
      const backendResponse = await loginWithGG(idToken);
      if (backendResponse && backendResponse.token) {
        dispatch(loadUser(backendResponse.user.username)); // Gọi loadUser với username
        dispatch(loadCart(backendResponse.user.user_id));
        dispatch(loadCalculateCartTotal(backendResponse.user.user_id));
        dispatch(loadWishList(backendResponse.user.user_id));
        dispatch(loadAddress(backendResponse.user.user_id));
        dispatch(loadOrder(backendResponse.user.user_id));
        dispatch(loadNotification(backendResponse.user.user_id));
        // Xử lý đăng nhập thành công
        Alert.alert('Success', 'Logged in successfully!');
        // Điều hướng đến màn hình chính sau khi đăng nhập
        router.push('/(tabs)/home');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Sign in in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            break;
          default:
            console.log('Other Google sign-in error:', error);
        }
      } else {
        console.log('Non-Google error:', error);
      }
    }
  };

  // Xử lý thay đổi trạng thái user từ Firebase
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Hủy đăng ký khi component unmount
  }, []);

  if (initializing) return null;

  return <CustomGoogleSigninButton onPress={signIn} />;
};

export default BtnLoginGG;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
