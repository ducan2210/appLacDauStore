import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {typeWishList} from '@/models/wishList';
import WishItem from './wishItem';

type props = {
  wishListData: typeWishList[];
};
const WishList = ({wishListData}: props) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={wishListData}
        renderItem={({item}) => {
          return <WishItem item={item}></WishItem>;
        }}></FlatList>
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({});
