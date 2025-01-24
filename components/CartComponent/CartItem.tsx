import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {typeCart} from '@/models/cart.model';
import {AntDesign, Feather} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProductById} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import BtnDeleteItemInCart from '../BtnDeleteItemInCart';
import {updateItemInCart} from '@/hooks/api/useCart';
import {useAppDispatch} from '@/redux/store';
import {typePromotion} from '@/models/promotion.model';
import {getPromotionByProductID} from '@/hooks/api/usePromotion';
import BtnAddToWishList from '../BtnAddToWishList';

const CartItem = ({item}: {item: typeCart}) => {
  const [cart, setCart] = useState<typeProduct>();
  const [value, setValue] = useState(`${item.quantity}`);
  const [promotion, setPromotion] = useState<typePromotion>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchItem = async () => {
      const result = await getProductById(item.product_id);
      if (result) {
        setCart(result);
        setValue(item.quantity.toString());
      } else {
        console.log('No cart found');
      }
    };
    const findPromotion = async () => {
      const promotion = await getPromotionByProductID(item.product_id);
      if (promotion) {
        setPromotion(promotion);
      }
    };

    findPromotion();
    fetchItem();
  }, [item]);

  useEffect(() => {}, [item]);

  const handleIncrease = () => {
    const currentValue = parseInt(value, 10); // Chuyển giá trị thành số
    setValue((currentValue + 1).toString()); // Tăng giá trị và chuyển lại thành chuỗi
    updateItemInCart(dispatch, item.user_id, item.product_id, currentValue + 1);
  };

  const handleDecrease = () => {
    const currentValue = parseInt(value, 10); // Chuyển giá trị thành số
    if (currentValue > 1) {
      setValue((currentValue - 1).toString()); // Giảm giá trị và chuyển lại thành chuỗi
      updateItemInCart(
        dispatch,
        item.user_id,
        item.product_id,
        currentValue - 1,
      );
    }
  };
  const handleBlur = () => {
    if (value === '') {
      setValue('1'); // Đặt lại giá trị thành '1' khi không nhập gì và mất focus
    }
  };
  return (
    <View style={styles.cartItem}>
      <Image
        style={{flex: 0.3, height: hp(10)}}
        source={{uri: cart?.image_url}}></Image>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 0.7,
          marginHorizontal: wp(3),
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginRight: wp(2),
              fontSize: wp(4),
              fontWeight: 'bold',
            }}>
            {cart?.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginRight: wp(2)}}>
              <BtnAddToWishList
                user_id={item.user_id}
                product_id={item.product_id as number}></BtnAddToWishList>
            </View>
            <BtnDeleteItemInCart
              user_id={item.user_id}
              product_id={item.product_id}></BtnDeleteItemInCart>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {cart?.discount_price ? (
            <View style={{marginVertical: hp(0)}}>
              <Text style={styles.discount_price}>
                ${(cart.discount_price * Number(value)).toFixed(2)}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontSize: wp(4),
                color: '#40BFFF',
                fontWeight: 'bold',
                // marginTop: hp(1),
              }}>
              <Text>${((cart?.price ?? 0) * Number(value)).toFixed(2)}</Text>
            </Text>
          )}

          <View style={{flexDirection: 'row'}}>
            {/* Nút giảm số lượng */}
            <TouchableOpacity
              onPress={() => handleDecrease()}
              style={{
                borderWidth: wp(0.2),
                borderColor: '#ccc',
                borderRadius: wp(1),
                height: wp(8),
                width: wp(8),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="minus" size={wp(4)} color="black" />
            </TouchableOpacity>

            {/* Số lượng */}
            <View style={{}}>
              <TextInput
                defaultValue="1"
                value={value}
                onChangeText={setValue}
                onBlur={handleBlur}
                style={{
                  fontSize: wp(4),
                  borderWidth: wp(0.2),
                  borderColor: '#ccc',
                  borderRadius: 4,
                  height: wp(8),
                  width: wp(12),
                  textAlign: 'center',
                  marginHorizontal: wp(2),
                }}></TextInput>
            </View>
            {/* Nút tăng số lượng */}
            <TouchableOpacity
              onPress={() => handleIncrease()}
              style={{
                borderWidth: wp(0.2),
                borderColor: '#ccc',
                borderRadius: wp(1),
                height: wp(8),
                width: wp(8),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="plus" size={wp(4)} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    height: hp(10),
    justifyContent: 'space-between',
    marginBottom: hp(3),
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
