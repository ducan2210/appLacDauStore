import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {typeProduct} from '@/models/product.model';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
type props = {
  data: typeProduct[];
  index?: number;
};

const ProductsRecommend = ({data, index}: props) => {
  const renderItem = ({item}: {item: typeProduct}) => (
    <Link
      href={{
        pathname: '/moreScreen/product/[productDetail]',
        params: {
          productDetail: item.product_id,
          productDescription: item.description,
          productName: item.name,
          productImage_url: item.image_url,
          productDiscount_price: item.discount_price,
          productPrice: item.price,
          productStock: item.stock,
          productSupplier_id: item.supplier_id,
          productCategory_id: item.category_id,
        },
      }}
      asChild>
      <TouchableOpacity style={styles.productBox}>
        <Image
          style={{width: wp(10), height: hp(5)}}
          source={{uri: item.image_url}}></Image>
        <Text style={styles.productName}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View>
      <View style={{justifyContent: 'space-around'}}>
        <FlatList
          scrollEnabled={false}
          data={index ? data.slice(0, index) : data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={[index ? styles.overlay : null]}
        />
      </View>
    </View>
  );
};

export default ProductsRecommend;

const styles = StyleSheet.create({
  productBox: {
    flexDirection: 'row',
    padding: wp(2),

    borderWidth: wp(0.1),
    borderColor: '#ccc',
    alignItems: 'center',
    // borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    marginLeft: wp(2),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Đảm bảo FlatList nằm trên các thành phần khác
    backgroundColor: '#f2f2f2', // Có thể thêm màu nền nếu muốn
  },
});
