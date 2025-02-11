import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {typeAddress} from '@/models/address.model';
import {RootState, useAppDispatch} from '@/redux/store';
import {updateDefaultAddress} from '@/hooks/api/useAddress';
import BtnDeleteAddress from '../BtnDeleteAddress';
import {Link} from 'expo-router';
import {useSelector} from 'react-redux';

const AddressItem = ({item}: {item: typeAddress}) => {
  const dispatch = useAppDispatch();
  const handleUpdateDefaultAddress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to change the default address?',
      [
        {
          text: 'No',
          onPress: () => console.log('No selected'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            updateDefaultAddress(dispatch, item.user_id, item.address_id),
        },
      ],
      {cancelable: false},
    );
  };
  // addToCart(dispatch, user_id, product_id, quantity),
  return (
    <View
      style={{
        marginTop: hp(2),
        padding: wp(4),
        borderColor: item.is_default == 1 ? '#40BFFF' : '#9098B1',
        borderWidth: item.is_default == 1 ? wp(1) : wp(0.1),
        borderRadius: wp(2),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>{item.full_name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.is_default == 1 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: wp(1)}}>
                <MaterialIcons
                  name="radio-button-checked"
                  size={hp(2)}
                  color="black"
                />
              </TouchableOpacity>
              <Text>Default address</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleUpdateDefaultAddress}>
              <MaterialIcons
                name="radio-button-unchecked"
                size={hp(2)}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.address}>Delivery Address: {item.address_line}</Text>
      <Text style={styles.phone}>Phone number: {item.phone}</Text>
      <View style={styles.buttonContainer}>
        <Link
          href={{
            pathname: '/moreScreen/accountSetting/[changeAddress]',
            params: {
              changeAddress: encodeURIComponent(JSON.stringify(item)),
            },
          }}
          asChild>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </Link>
        <BtnDeleteAddress
          user_id={item.user_id}
          address_id={item.address_id}></BtnDeleteAddress>
      </View>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  addressContainer: {},
  name: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  address: {
    fontSize: wp(4),
    color: '#9098B1',
    marginVertical: hp(2),
  },
  phone: {
    fontSize: wp(4),
    color: '#9098B1',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#40BFFF',
    height: hp(4),
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  editButtonText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'white',
  },
  trashButton: {
    marginLeft: wp(4),
  },
});
