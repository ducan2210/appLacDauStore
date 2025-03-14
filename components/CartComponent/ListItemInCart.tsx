import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {typeCart} from '@/models/cart.model';
import CartItem from './CartItem';

const ListItemInCart = ({cartData}: {cartData: typeCart[]}) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={cartData}
        renderItem={({item}) => {
          return <CartItem item={item}></CartItem>;
        }}></FlatList>
    </View>
  );
};

export default ListItemInCart;

const styles = StyleSheet.create({});
