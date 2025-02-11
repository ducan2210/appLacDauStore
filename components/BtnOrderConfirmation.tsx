import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {router} from 'expo-router';
import {createOrder} from '@/hooks/api/useOrder';
import {RootState, useAppDispatch} from '@/redux/store';
import {useSelector} from 'react-redux';
import {createOrderItem} from '@/hooks/api/useOrderItem';
const BtnOrderConfirmation = ({
  user_id,
  total_amount,
  order_information,
  discount_applied,
  payment_method_id,
}: {
  user_id: number;
  total_amount: number;
  order_information: string;
  discount_applied: string;
  payment_method_id: number;
}) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handleOrderConfirmation = () => {
    createOrder(
      cart,
      dispatch,
      user_id,
      total_amount,
      order_information,
      discount_applied,
      payment_method_id,
    );
  };
  const handleAddAddress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to save the changes to this address?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleOrderConfirmation(),
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <TouchableOpacity onPress={handleAddAddress} style={styles.button}>
      <Text style={styles.buttonText}>Order Confirmation</Text>
    </TouchableOpacity>
  );
};

export default BtnOrderConfirmation;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#40BFFF',
    bottom: hp(6),
    width: wp(90),
    alignSelf: 'center',
    padding: wp(5),
    borderRadius: wp(2),
    alignItems: 'center',
    height: hp(8),
  },

  buttonText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'white',
  },
});
