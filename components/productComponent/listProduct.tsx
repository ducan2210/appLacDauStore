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
  sort?: boolean;
};

const ListProduct = ({
  data = [],
  horizontal = true, // Giá trị mặc định
  numColumns = 1, // Giá trị mặc định
  sort = false,
}: typeListProduct) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // asc: tăng dần, desc: giảm dần
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [sortedData, setSortedData] = useState<typeProduct[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(true);
      const sorted = [...data].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setSortedData(sorted);
      setIsLoading(false);
    } else {
      setSortedData([]);
      setIsLoading(false);
    }
  }, [sort, data, sortOrder]);

  useEffect(() => {
    if (!sort) {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  }, [sort]);

  return (
    <View>
      {isLoading ? (
        <Loading visible={isLoading} text="Loading..." />
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#9098B1',
  },
});

export default ListProduct;
