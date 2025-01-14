import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import ProductItem from './productItem';
import {typeProduct} from '@/models/product.model';
import Loading from '../Loading';

type typeListProduct = {
  data: typeProduct[];
  horizontal?: boolean; // Không bắt buộc
  numColumns?: number; // Không bắt buộc
};

const ListProduct = ({
  data = [],
  horizontal = true, // Giá trị mặc định
  numColumns = 1, // Giá trị mặc định
}: typeListProduct) => {
  return (
    <FlatList
      scrollEnabled={horizontal}
      data={data} // Sử dụng sortedData để hiển thị danh sách đã sắp xếp
      horizontal={horizontal}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <ProductItem styleType={horizontal} item={item} index={index} />
      )}
      keyExtractor={item => item.product_id.toString()}
    />
  );
};

const styles = StyleSheet.create({});

export default ListProduct;
