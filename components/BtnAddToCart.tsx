import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addToCart} from '@/hooks/api/useCart';
import {useAppDispatch} from '@/redux/store';

const BtnAddToCart = ({
  user_id,
  product_id,
  quantity,
}: {
  user_id: number;
  product_id: number;
  quantity: number;
}) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to add this to your cart?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => addToCart(dispatch, user_id, product_id, quantity),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity
      style={{
        marginTop: hp(2),
        backgroundColor: '#40BFFF',
        height: hp(8),
        marginBottom: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
      }}
      onPress={handleAddToCart}>
      <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
        Add To Cart
      </Text>
    </TouchableOpacity>
  );
};

export default BtnAddToCart;

const styles = StyleSheet.create({});
