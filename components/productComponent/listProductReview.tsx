import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {productReview, productReviewData} from '@/data/ProductReviewData';
import ProductReview from './productReview';
import {typeReview} from '@/models/review.model';

const ListProductReview = ({data}: {data: typeReview[]}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={({item, index}) => (
        <ProductReview item={item}></ProductReview>
      )}></FlatList>
  );
};

export default ListProductReview;

const styles = StyleSheet.create({});
