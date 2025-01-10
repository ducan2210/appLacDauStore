import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch} from '@/redux/store';
import {addToWishList} from '@/hooks/api/useWishList';
import {AntDesign} from '@expo/vector-icons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const BtnAddToWishList = ({
  user_id,
  product_id,
}: {
  user_id: number;
  product_id: number;
}) => {
  const dispatch = useAppDispatch();
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

  return (
    <TouchableOpacity onPress={handleAddToCart}>
      <AntDesign style={{}} name="hearto" size={wp(7)} color="#9098B1" />
    </TouchableOpacity>
  );
};

export default BtnAddToWishList;

const styles = StyleSheet.create({});
