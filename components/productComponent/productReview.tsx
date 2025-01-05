import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import StarRating from '../StarRating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {productReview} from '@/data/ProductReviewData';

type props = {
  item: productReview;
  index?: number;
};

const ProductReview = ({item, index}: props) => {
  return (
    <View style={{marginTop: hp(2)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{
            width: wp(20),
            height: wp(20),
            marginTop: hp(2),
            borderRadius: wp(100),
          }}
          source={item.avatar}
        />
        <View style={{marginLeft: wp(5)}}>
          <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
            {item.nameCustomer}
          </Text>
          <StarRating rating={item.rating}></StarRating>
        </View>
      </View>
      <Text style={{fontSize: wp(4), color: '#9098B1', marginTop: hp(2)}}>
        {item.comment}
      </Text>
      <FlatList
        horizontal
        data={item.image}
        renderItem={({item}) => (
          <Image
            source={item}
            style={{
              width: wp(25),
              height: wp(25),
              marginTop: hp(2),
              marginRight: wp(4),
              borderRadius: wp(5),
            }}></Image>
        )}></FlatList>
      <Text style={{fontSize: wp(4), color: '#9098B1', marginTop: hp(2)}}>
        {item.date.toLocaleDateString()}
      </Text>
    </View>
  );
};

export default ProductReview;

const styles = StyleSheet.create({});
