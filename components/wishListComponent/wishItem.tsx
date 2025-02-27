import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {typeWishList} from '@/models/wishList';
import {getProductById} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import {Link} from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from '../StarRating';
import {Feather} from '@expo/vector-icons';
import BtnDeleteItemInWishList from '../BtnDeleteItemInWishList';
import {typePromotion} from '@/models/promotion.model';
import {getPromotionByProductID} from '@/hooks/api/usePromotion';
const WishItem = ({item}: {item: typeWishList}) => {
  const [wishItem, setWishItem] = useState<typeProduct>();
  useEffect(() => {
    const fetchItem = async () => {
      const result = await getProductById(item.product_id);
      if (result) {
        setWishItem(result);
      } else {
        console.log('No item found');
      }
    };
    fetchItem();
  }, [item]);

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
          productDetail: encodeURIComponent(JSON.stringify(wishItem)),
        },
      }}
      asChild>
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={styles.imageItem}
          source={{uri: wishItem?.image_url}}></Image>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: 'bold',
              width: wp(45), // Đặt width tối đa cho Text, có thể thay bằng chiều rộng cố định nếu cần
              overflow: 'hidden', // Ẩn phần văn bản vượt ra ngoài
            }}
            numberOfLines={1} // Giới hạn văn bản chỉ hiển thị 1 dòng
            ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối nếu văn bản dài
          >
            {wishItem?.name}
          </Text>
          <StarRating rating={4}></StarRating>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {wishItem?.discount_price ? (
              <View style={{marginVertical: hp(0)}}>
                <Text style={styles.discount_price}>
                  ${wishItem.discount_price}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.price}>${wishItem.price}</Text>
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
                }}>
                ${wishItem?.price}
              </Text>
            )}
            <BtnDeleteItemInWishList
              user_id={item.user_id}
              product_id={item.product_id}></BtnDeleteItemInWishList>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default WishItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    marginBottom: hp(2),
    flexDirection: 'row',
  },
  imageItem: {
    height: hp(15),
    width: wp(38),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    marginRight: wp(5),
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
