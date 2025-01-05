import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
import {typeProduct} from '@/models/product.model';

type Props = {
  item: typeProduct;
  index: number;
  styleType?: boolean;
};

const ProductItem = ({item, index, styleType}: Props) => {
  return (
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
      <TouchableOpacity
        style={
          styleType
            ? styles.itemContainerHorizontal
            : styles.itemContainerVertical
        }>
        <Image
          style={
            styleType ? styles.imageItemHorizontal : styles.imageItemVertical
          }
          source={{uri: item.image_url}}></Image>
        <Text
          style={{
            marginTop: hp(1),
            fontSize: wp(5),
            fontWeight: 'bold',
            width: styleType ? wp(30) : wp(38), // Đặt width tối đa cho Text, có thể thay bằng chiều rộng cố định nếu cần
            overflow: 'hidden', // Ẩn phần văn bản vượt ra ngoài
          }}
          numberOfLines={1} // Giới hạn văn bản chỉ hiển thị 1 dòng
          ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối nếu văn bản dài
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  itemContainerHorizontal: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    marginRight: wp(5),
    marginTop: hp(2),
  },
  itemContainerVertical: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    marginRight: wp(5),
    marginBottom: hp(2),
  },
  imageItemVertical: {height: hp(20), width: wp(38)},
  imageItemHorizontal: {
    height: hp(15),
    width: wp(30),
  },
});
