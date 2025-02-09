import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {typeAddress} from '@/models/address.model';
import AddressItem from './addressItem';

const ListAddress = ({addressData}: {addressData: typeAddress[]}) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={addressData}
        renderItem={({item}) => {
          return <AddressItem item={item}></AddressItem>;
        }}></FlatList>
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({});
