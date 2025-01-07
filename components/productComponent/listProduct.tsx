import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ProductItem from './productItem';
import {typeProduct} from '@/models/product.model';

type typeListProduct = {
  data: typeProduct[];
  horizontal?: boolean; // Không bắt buộc
  numColumns?: number; // Không bắt buộc
  sort?: boolean;
};

const ListProduct = ({
  data = [],
  horizontal = true, // Giá trị mặc định
  numColumns = 1, // Giá trị mặc định
  sort = true,
}: typeListProduct) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // asc: tăng dần, desc: giảm dần

  useEffect(() => {
    if (!sort) {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  }, [sort]);

  const sortedData = data.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <View>
      <FlatList
        scrollEnabled={horizontal}
        data={sortedData} // Sử dụng sortedData để hiển thị danh sách đã sắp xếp
        horizontal={horizontal}
        numColumns={numColumns}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ProductItem styleType={horizontal} item={item} index={index} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  activeSortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
});

export default ListProduct;
