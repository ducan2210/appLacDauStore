import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  const [promotion, setPromotion] = useState<typePromotion>();

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
          source={{uri: wishItem?.image_url}}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text
            style={styles.productName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {wishItem?.name}
          </Text>
          <StarRating rating={4} size={wp(4)} />
          <View style={styles.priceActions}>
            {wishItem?.discount_price ? (
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>
                  ${wishItem.discount_price}
                </Text>
                <View style={styles.originalPriceContainer}>
                  <Text style={styles.originalPrice}>${wishItem.price}</Text>
                  <Text style={styles.discountPercent}>
                    {Math.floor(promotion?.discount_percent as number)}% Off
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.price}>${wishItem?.price}</Text>
            )}
            <BtnDeleteItemInWishList
              user_id={item.user_id}
              product_id={item.product_id}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default WishItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: wp(3),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 3,
  },
  imageItem: {
    width: wp(28),
    height: hp(15),
    borderRadius: wp(2),
    backgroundColor: '#F5F6FA',
    marginRight: wp(3),
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  productName: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#223263',
    marginBottom: hp(1),
  },
  priceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    // alignItems: 'flex-end',
  },
  discountPrice: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#FF5733',
  },
  originalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginRight: wp(2),
  },
  discountPercent: {
    fontSize: wp(3),
    fontWeight: '700',
    color: '#FF5733',
  },
  price: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#40BFFF',
  },
  deleteButton: {
    padding: wp(1),
  },
});
