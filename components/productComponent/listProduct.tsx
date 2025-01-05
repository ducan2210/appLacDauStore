import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ProductItem from './productItem';
import { typeProduct } from '@/models/product.model';

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
    <View>
      <FlatList
        scrollEnabled={horizontal}
        data={data}
        horizontal={horizontal}
        numColumns={!horizontal ? numColumns : undefined} // Chỉ truyền numColumns khi không cuộn ngang
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ProductItem styleType={horizontal} item={item} index={index} />
        )}
      />
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({});
