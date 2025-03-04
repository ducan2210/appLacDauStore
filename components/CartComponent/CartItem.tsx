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
import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProductById} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import BtnDeleteItemInCart from '../BtnDeleteItemInCart';
import {updateItemInCart} from '@/hooks/api/useCart';
import {RootState, useAppDispatch} from '@/redux/store';
import {typePromotion} from '@/models/promotion.model';
import {getPromotionByProductID} from '@/hooks/api/usePromotion';
import BtnAddToWishList from '../BtnAddToWishList';
import {useSelector} from 'react-redux';

const CartItem = ({item}: {item: typeCart}) => {
  const [cart, setCart] = useState<typeProduct>();
  const [value, setValue] = useState(`${item.quantity}`);
  const [isChose, setIsChose] = useState(item.status);
  const dispatch = useAppDispatch();

  const handleChoseItem = () => {
    if (isChose === 0) {
      setIsChose(1);
      updateItemInCart(
        dispatch,
        item.user_id,
        item.product_id,
        Number(value),
        1,
        item.cart_id,
      );
    } else {
      setIsChose(0);
      updateItemInCart(
        dispatch,
        item.user_id,
        item.product_id,
        Number(value),
        0,
        item.cart_id,
      );
    }
  };

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

    fetchItem();
  }, [item]);

  const handleIncrease = () => {
    const currentValue = parseInt(value, 10);
    setValue((currentValue + 1).toString());
    updateItemInCart(
      dispatch,
      item.user_id,
      item.product_id,
      currentValue + 1,
      item.status,
      item.cart_id,
    );
  };

  const handleDecrease = () => {
    const currentValue = parseInt(value, 10);
    if (currentValue > 1) {
      setValue((currentValue - 1).toString());
      updateItemInCart(
        dispatch,
        item.user_id,
        item.product_id,
        currentValue - 1,
        item.status,
        item.cart_id,
      );
    }
  };

  const handleBlur = () => {
    if (value === '') {
      setValue('1');
    }
  };

  return (
    <View style={styles.cartItem}>
      <TouchableOpacity
        onPress={handleChoseItem}
        style={styles.checkboxContainer}>
        <MaterialCommunityIcons
          name={
            isChose === 1 ? 'checkbox-intermediate' : 'checkbox-blank-outline'
          }
          size={wp(5)}
          color={isChose === 1 ? '#40BFFF' : '#666666'}
        />
      </TouchableOpacity>
      <Image
        style={styles.productImage}
        source={{uri: cart?.image_url}}
        resizeMode="contain"
      />
      <View style={styles.productDetails}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>{cart?.name}</Text>
          <View style={styles.actions}>
            <BtnAddToWishList
              user_id={item.user_id}
              product_id={item.product_id as number}
            />
            <BtnDeleteItemInCart
              user_id={item.user_id}
              product_id={item.product_id}
            />
          </View>
        </View>
        <View style={styles.priceQuantityRow}>
          {cart?.discount_price ? (
            <View style={styles.priceContainer}>
              <Text style={styles.discountPrice}>
                ${(cart.discount_price * Number(value)).toFixed(2)}
              </Text>
              <Text style={styles.originalPrice}>
                ${(cart.price * Number(value)).toFixed(2)}
              </Text>
            </View>
          ) : (
            <Text style={styles.price}>
              ${((cart?.price ?? 0) * Number(value)).toFixed(2)}
            </Text>
          )}
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={handleDecrease}
              style={styles.quantityButton}>
              <AntDesign name="minus" size={wp(4)} color="#666666" />
            </TouchableOpacity>
            <TextInput
              value={value}
              onChangeText={setValue}
              onBlur={handleBlur}
              keyboardType="numeric"
              style={styles.quantityInput}
            />
            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.quantityButton}>
              <AntDesign name="plus" size={wp(4)} color="#666666" />
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
    height: hp(15),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    marginBottom: hp(2),
    padding: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 3,
  },
  checkboxContainer: {
    justifyContent: 'center',
    marginRight: wp(2),
  },
  productImage: {
    width: wp(25),
    height: hp(12),
    borderRadius: wp(2),
    backgroundColor: '#F5F6FA',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#223263',
    maxWidth: wp(40),
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: wp(2),
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  discountPrice: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#FF5733',
  },
  originalPrice: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginTop: hp(0.5),
  },
  price: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#40BFFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  quantityInput: {
    fontSize: wp(4),
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    borderRadius: wp(2),
    height: wp(8),
    width: wp(12),
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    color: '#223263',
  },
});
