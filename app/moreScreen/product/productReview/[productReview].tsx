import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useLocalSearchParams} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import ListProductReview from '@/components/productComponent/listProductReview';
import {productReviewData} from '@/data/ProductReviewData';
const ProductReview = () => {
  const {productReview} = useLocalSearchParams();
  const Filter = () => {
    const numbers = Array.from({length: 5}, (_, index) => index + 1); // Tạo mảng [1, 2, 3, 4, 5]
    return (
      <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(8),
              width: wp(30),
              backgroundColor: '#ecf9ff',
              padding: wp(3),
              borderRadius: wp(3),
            }}>
            <Text
              style={{fontSize: wp(4), fontWeight: 'bold', color: '#40bfff'}}>
              All Review
            </Text>
          </TouchableOpacity>
          {numbers.map(number => (
            <TouchableOpacity
              key={number}
              style={{
                height: hp(8),
                width: wp(25),
                padding: wp(3),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: wp(0.1),
                marginLeft: wp(2),
                borderRadius: wp(3),
                flexDirection: 'row',
                borderColor: '#9098B1',
              }}>
              <AntDesign name={'star'} size={wp(6)} color={'#FFD700'} />
              <Text style={{fontSize: wp(4), marginLeft: wp(2)}}>{number}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>{productReview}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Filter></Filter>
          <ListProductReview data={productReviewData}></ListProductReview>
        </View>
        <Link
          href={{
            pathname:
              '/moreScreen/product/productReview/writeReview/[writeReview]',
            params: {writeReview: 'truyen ne may'},
          }}
          asChild>
          <TouchableOpacity
            style={{
              marginTop: hp(2),
              backgroundColor: '#40BFFF',
              height: hp(8),
              marginBottom: hp(7),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
            }}>
            <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
              Write Review
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
};

export default ProductReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {
    marginTop: hp(2),
  },
});
