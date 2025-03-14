import BtnBackScreen from '@/components/BtnBackScreen';
import ListProductReview from '@/components/productComponent/listProductReview';
import {typeProductDetail} from '@/models/product.model';
import {AntDesign} from '@expo/vector-icons';
import {Link, useLocalSearchParams} from 'expo-router';
import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ProductReview = () => {
  const {productReview} = useLocalSearchParams();
  const productDetail: typeProductDetail = productReview
    ? JSON.parse(productReview as string)
    : null;

  useEffect(() => {
    console.log(productDetail);
  }, [productDetail]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>{productDetail.name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <ListProductReview data={productDetail.Reviews}></ListProductReview>
        </View>
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
