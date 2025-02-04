import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import {AntDesign} from '@expo/vector-icons';
import {Link} from 'expo-router';
import ListItemInCart from '@/components/CartComponent/ListItemInCart';
import {getPromotionByCode} from '@/hooks/api/usePromotion';
import {typePromotion} from '@/models/promotion.model';
const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [coupon, setCoupon] = useState('');
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const [promotion, setPromotion] = useState<typePromotion>();
  const textInputRef = useRef<TextInput>(null);
  const handleApplyCoupon = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    const findPromotion = async () => {
      const promotion = await getPromotionByCode(coupon);
      console.log(promotion);
      if (promotion) {
        setPromotion(promotion);
      } else {
        Alert.alert('Error', 'Invalid coupon code');
        setCoupon('');
        setPromotion(undefined);
      }
    };
    findPromotion();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Your Cart</Text>
        </View>
      </View>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <AntDesign name="shoppingcart" size={wp(20)} color="#9098B1" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubText}>
            Looks like you haven't added any items to your cart yet.
          </Text>
          <Link href={'/(tabs)/home'} asChild>
            <TouchableOpacity style={styles.startShoppingButton}>
              <Text style={styles.startShoppingButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <ListItemInCart cartData={cart}></ListItemInCart>
          <View
            style={{
              marginBottom: hp(5),
            }}>
            <View style={{paddingHorizontal: wp(3), marginTop: hp(5)}}>
              <View
                style={{
                  borderWidth: wp(0.05),
                  borderRadius: wp(2),
                  height: hp(7),
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: '#9098B1',
                }}>
                <TextInput
                  value={coupon}
                  ref={textInputRef}
                  onChangeText={text => setCoupon(text)}
                  placeholder="Enter coupon Code"
                  style={{
                    padding: hp(2),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    borderRadius: wp(1),
                    alignItems: 'center',
                  }}
                />

                <TouchableOpacity
                  onPress={() => handleApplyCoupon()}
                  style={{
                    width: wp(25), // Chỉnh lại width thay vì sử dụng flex: 0.2
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(7),
                    backgroundColor: '#40BFFF',
                    borderRadius: wp(2), // Thêm borderRadius để phù hợp với viền
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: wp(4),
                      color: 'white',
                    }}>
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: hp(5),
                paddingHorizontal: wp(5),
                height: hp(18),
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: wp(4), color: '#9098B1'}}>
                  Items ({cart.length})
                </Text>
                <Text style={{fontSize: wp(4)}}>${totalPrice}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: wp(4), color: '#9098B1'}}>
                  Shipping
                </Text>
                <Text style={{fontSize: wp(4)}}>$10</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: wp(4), color: '#9098B1'}}>
                  Import charges
                </Text>
                <Text style={{fontSize: wp(4)}}>$10</Text>
              </View>
              {promotion && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: wp(4), color: '#9098B1'}}>
                    Total discount coupon
                  </Text>
                  <Text style={{fontSize: wp(4), color: 'red'}}>
                    {' '}
                    <Text>
                      -$
                      {(
                        (totalPrice * promotion.discount_percent) /
                        100
                      ).toFixed(2)}
                    </Text>
                  </Text>
                </View>
              )}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: wp(4)}}>
                  Total Price
                </Text>
                {promotion ? (
                  <Text
                    style={{
                      fontSize: wp(4),
                      color: '#40BFFF',
                      fontWeight: 'bold',
                      // marginTop: hp(1),
                    }}>
                    $
                    {(
                      totalPrice +
                      10 +
                      10 -
                      (totalPrice * promotion.discount_percent) / 100
                    ).toFixed(2)}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: wp(4),
                      color: '#40BFFF',
                      fontWeight: 'bold',
                      // marginTop: hp(1),
                    }}>
                    ${totalPrice + 10 + 10}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.btnCheckOut}>
              <Text
                style={{fontWeight: 'bold', fontSize: wp(4), color: 'white'}}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <View style={{height: hp(10)}}></View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(6),
    paddingHorizontal: wp(3),
  },
  body: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  cartItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  btnCheckOut: {
    marginTop: hp(2),
    backgroundColor: '#40BFFF',
    height: hp(8),
    marginBottom: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  emptyCartText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#223263',
    marginTop: hp(2),
  },
  emptyCartSubText: {
    fontSize: wp(4),
    color: '#9098B1',
    textAlign: 'center',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  startShoppingButton: {
    backgroundColor: '#40BFFF',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderRadius: wp(2),
  },
  startShoppingButtonText: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
