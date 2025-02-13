import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {typeOrder} from '@/models/order.model';
import OrderItem from './orderItem';

const ListOrder = ({orderData}: {orderData: typeOrder[]}) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={orderData}
        renderItem={({item}) => {
          return <OrderItem item={item}></OrderItem>;
        }}></FlatList>
    </View>
  );
};

export default ListOrder;

const styles = StyleSheet.create({});
