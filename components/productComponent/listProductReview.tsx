import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {productReview, productReviewData} from '@/data/ProductReviewData';
import ProductReview from './productReview';

type typeListProductReview = {
  data: productReview[];
};

const ListProductReview = ({data}: typeListProductReview) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={({item, index}) => (
        <ProductReview item={item} index={index}></ProductReview>
      )}></FlatList>
  );
};

export default ListProductReview;

const styles = StyleSheet.create({});
