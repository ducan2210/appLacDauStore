import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCartById} from '@/hooks/api/useCart';

import {typeCart} from '@/models/cart.model';
import CartItem from './cartItem';


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
