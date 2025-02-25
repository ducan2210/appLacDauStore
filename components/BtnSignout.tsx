import React, {useState} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@/redux/store';
import {logoutUser} from '@/redux/slices/userSlice';
import {clearCart} from '@/redux/slices/cartSlice';
import {clearWishList} from '@/redux/slices/wishListSlice';
import {clearAddress} from '@/redux/slices/addressSlice';
import {clearOrder} from '@/redux/slices/orderSlice';

const BtnSignout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('token');
      dispatch(logoutUser());
      dispatch(clearCart());
      dispatch(clearWishList());
      dispatch(clearAddress());
      dispatch(clearOrder());
      Alert.alert('Success', 'Logged out successfully!');
      router.replace('/entry/LoginUI');
    } catch (error) {
      console.error('Sign-out error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.btnSignOut}
      onPress={handleSignOut}
      disabled={loading}>
      <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
        {loading ? 'Logging out...' : 'Sign Out'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSignOut: {
    paddingVertical: hp(2),
    backgroundColor: '#FF4D4D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    width: wp(90),
  },
});

export default BtnSignout;
