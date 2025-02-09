import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch} from '@/redux/store';
import {Feather} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {deleteAddress} from '@/hooks/api/useAddress';
const BtnDeleteAddress = ({
  user_id,
  address_id,
}: {
  user_id: number;
  address_id: number;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteItem = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteAddress(dispatch, user_id, address_id),
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <TouchableOpacity style={{marginLeft: wp(2)}} onPress={handleDeleteItem}>
      <Feather name="trash" size={wp(7)} color="#9098B1" />
    </TouchableOpacity>
  );
};

export default BtnDeleteAddress;

const styles = StyleSheet.create({});
