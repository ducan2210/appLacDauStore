import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
import {typeProduct} from '@/models/product.model';
import StarRating from '../StarRating';
import {typePromotion} from '@/models/promotion.model';
import {getPromotionByProductID} from '@/hooks/api/usePromotion';

type Props = {
  item: typeProduct;
  index: number;
  styleType?: boolean;
};

const ProductItem = ({item, index, styleType}: Props) => {
  const [promotion, setPromotion] = useState<typePromotion>();
  useEffect(() => {
    const findPromotion = async () => {
      const promotion = await getPromotionByProductID(item.product_id);
      if (promotion) {
        setPromotion(promotion);
      }
    };

    findPromotion();
  }, [item]);

  return (
    <Link
      href={{
        pathname: '/moreScreen/product/[productDetail]',
        params: {
          productDetail: encodeURIComponent(JSON.stringify(item)),
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
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: hp(1),
          }}>
          <Text
            style={{
              fontSize: wp(4),
              fontWeight: 'bold',
              width: styleType ? wp(38) : wp(38), // Đặt width tối đa cho Text, có thể thay bằng chiều rộng cố định nếu cần
              overflow: 'hidden', // Ẩn phần văn bản vượt ra ngoài
            }}
            numberOfLines={2} // Giới hạn văn bản chỉ hiển thị 1 dòng
            ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối nếu văn bản dài
          >
            {item.name}
          </Text>
          <StarRating rating={4}></StarRating>
          {item.discount_price ? (
            <View style={{marginVertical: hp(0)}}>
              <Text style={styles.discount_price}>${item.discount_price}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.price}>${item.price}</Text>
                <Text
                  style={{
                    fontSize: wp(2.5),
                    fontWeight: 'bold',
                    color: 'red',
                    marginLeft: wp(2),
                  }}>
                  {Math.floor(promotion?.discount_percent as number)}% Off
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                fontSize: wp(4),
                color: '#40BFFF',
                fontWeight: 'bold',
                // marginTop: hp(1),
              }}>
              ${item.price}
            </Text>
          )}
        </View>
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
    height: hp(33),
  },
  itemContainerVertical: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    marginRight: wp(5),
    marginBottom: hp(2),
    height: hp(33),
  },
  imageItemVertical: {
    height: hp(15),
    width: wp(38),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    padding: wp(2),
  },
  imageItemHorizontal: {
    height: hp(15),
    width: wp(38),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    padding: wp(2),
  },
  discount_price: {
    fontSize: wp(4),
    color: '#40BFFF',
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  price: {
    fontSize: wp(4),
    color: '#9098B1',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
});
