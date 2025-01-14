import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addToCart, deleteItemInCart} from '@/hooks/api/useCart';
import {useAppDispatch} from '@/redux/store';
import {Feather} from '@expo/vector-icons';
import {deleteItemInWishList} from '@/hooks/api/useWishList';

const BtnDeleteItemInWishList = ({
  user_id,
  product_id,
}: {
  user_id: number;
  product_id: number;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteItem = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this item from your wish list?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteItemInWishList(dispatch, user_id, product_id),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity onPress={handleDeleteItem}>
      <Feather name="trash" size={wp(5)} color="#9098B1" />
    </TouchableOpacity>
  );
};
export default BtnDeleteItemInWishList;
