import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useAppDispatch} from '@/redux/store';
import {createAddress} from '@/hooks/api/useAddress';
const BtnAddAddress = ({
  user_id,
  full_name,
  phone,
  address_line,
  postal_code,
  city,
  state,
  country,
}: {
  user_id: number;
  full_name: string;
  phone: string;
  address_line: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
}) => {
  const dispatch = useAppDispatch();
  const handleAddAddress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to add this to your address?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            createAddress(
              dispatch,
              user_id,
              full_name,
              phone,
              address_line,
              postal_code,
              city,
              state,
              country,
            ),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#40BFFF',
        height: hp(8),
        marginBottom: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
      }}
      onPress={handleAddAddress}>
      <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
        Add Address
      </Text>
    </TouchableOpacity>
  );
};

export default BtnAddAddress;

const styles = StyleSheet.create({});
