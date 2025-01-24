import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RootState, useAppDispatch} from '@/redux/store';
import {addToWishList, deleteItemInWishList} from '@/hooks/api/useWishList';
import {AntDesign} from '@expo/vector-icons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const BtnAddToWishList = ({
  user_id,
  product_id,
}: {
  user_id: number;
  product_id: number;
}) => {
  const dispatch = useAppDispatch();
  const wishList = useSelector((state: RootState) => state.wishList.wishList);
  const isProductInWishList = wishList.some(
    item => item.product_id === product_id,
  );
  const handleAddToCart = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to add this to your wish list?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => addToWishList(dispatch, user_id, product_id),
        },
      ],
      {cancelable: false},
    );
  };

  const handleRemoveFromWishList = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove this from your wish list?',
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
    <View>
      {!isProductInWishList ? (
        <TouchableOpacity onPress={handleAddToCart}>
          <AntDesign name="hearto" size={wp(5)} color="#9098B1" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleRemoveFromWishList}>
          <AntDesign name="heart" size={wp(5)} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BtnAddToWishList;

const styles = StyleSheet.create({});
