import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Slider from '@/components/slider/Slider';
import StarRating from '@/components/StarRating';

import {productReviewData} from '@/data/ProductReviewData';
import ProductReview from '@/components/productComponent/productReview';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnAddToCart from '@/components/BtnAddToCart';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import BtnAddToWishList from '@/components/BtnAddToWishList';
import {typeProduct} from '@/models/product.model';
const ProductDetail = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [products, setProducts] = useState<typeProduct>();
  const {productDetail} = useLocalSearchParams();
  useEffect(() => {
    try {
      const decodedProduct = productDetail
        ? decodeURIComponent(productDetail as string)
        : '[]';
      const dataArray = JSON.parse(decodedProduct);
      setProducts(dataArray);
    } catch (error) {
      console.error('Error parsing sort parameter:', error);
    }
  }, [productDetail]);
  const product_id = Number(productDetail); // Chuyển 'product_id' sang kiểu số
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>{products?.name}</Text>
        </View>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Slider></Slider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(2),
          }}>
          <Text style={{fontSize: wp(7), fontWeight: 'bold'}}>
            {products?.name}
          </Text>
          <BtnAddToWishList
            user_id={user.user_id}
            product_id={products?.product_id as number}></BtnAddToWishList>
        </View>
        <View style={{marginTop: hp(1), marginBottom: hp(3)}}>
          <StarRating rating={4}></StarRating>
        </View>
        <Text style={{fontSize: wp(7), fontWeight: 'bold', color: '#40BFFF'}}>
          {products?.price}$
        </Text>
        <View>
          <View style={styles.other}>
            <Text style={styles.otherTitle1}>Review Product</Text>
            <Link
              href={{
                pathname: '/moreScreen/product/productReview/[productReview]',
                params: {productReview: 'def'},
              }}
              asChild>
              <TouchableOpacity>
                <Text style={styles.otherTitle2}>See More</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <StarRating rating={4}></StarRating>
          <Text style={{fontSize: wp(5), marginLeft: wp(2)}}>
            So sao (so Review)
          </Text>
        </View>
        <View>
          <ProductReview item={productReviewData[0]}></ProductReview>
          {/* <ListProductReview data={productReviewData}></ListProductReview> */}
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text style={styles.otherTitle1}>You Might Also Like</Text>
        </View>
        {/* <ListProduct data={ProductData}></ListProduct> */}
        {user && products?.product_id ? (
          <BtnAddToCart
            user_id={user.user_id}
            product_id={products?.product_id}
            quantity={1}
          />
        ) : (
          <Text style={{color: 'red'}}>Thông tin sản phẩm không hợp lệ</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    // marginBottom: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {},
  other: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  otherTitle1: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  otherTitle2: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#40BFFF',
  },
});
