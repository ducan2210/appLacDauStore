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
          source={{uri: item.image_url}}
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <StarRating rating={4} />
          {item.discount_price ? (
            <View style={styles.priceContainer}>
              <Text style={styles.discountPrice}>${item.discount_price}</Text>
              <View style={styles.originalPriceContainer}>
                <Text style={styles.originalPrice}>${item.price}</Text>
                <Text style={styles.discountPercent}>
                  {Math.floor(promotion?.discount_percent as number)}% Off
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.price}>${item.price}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  itemContainerHorizontal: {
    padding: wp(3),
    borderRadius: wp(3),
    backgroundColor: '#FFFFFF',
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    marginRight: wp(4),
    marginVertical: hp(1),
    width: wp(43.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 3,
  },
  itemContainerVertical: {
    padding: wp(3),
    borderRadius: wp(3),
    backgroundColor: '#FFFFFF',
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    marginRight: wp(4),
    marginVertical: hp(1),
    width: wp(43.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 3,
  },
  imageItemVertical: {
    height: hp(15),
    width: wp(35),
    borderRadius: wp(2),
    resizeMode: 'cover',
  },
  imageItemHorizontal: {
    height: hp(15),
    width: wp(35),
    borderRadius: wp(2),
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginTop: hp(1),
  },
  name: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#223263',
    marginBottom: hp(0.8),
  },
  priceContainer: {
    marginTop: hp(0.5),
  },
  discountPrice: {
    fontSize: wp(4.5),
    color: '#FF5733',
    fontWeight: '700',
  },
  originalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.2),
  },
  originalPrice: {
    fontSize: wp(3.5),
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginRight: wp(2),
  },
  discountPercent: {
    fontSize: wp(3.2),
    fontWeight: '700',
    color: '#FF5733',
  },
  price: {
    fontSize: wp(4.5),
    color: '#40BFFF',
    fontWeight: '700',
    marginTop: hp(0.5),
  },
});
