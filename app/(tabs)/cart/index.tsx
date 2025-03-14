import {
  Alert,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
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
import {getPromotionByCode} from '@/hooks/api/usePromotion';
import {typePromotion} from '@/models/promotion.model';
import ListItemInCart from '@/components/cartComponent/listItemInCart';
import {useAppDispatch} from '@/redux/store';
import {
  loadCart,
  setDiscountApplied,
  setMoneyMustBePaid,
} from '@/redux/slices/cartSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import {getAllCouriers, typeCouriers} from '@/hooks/api/useAfterShip';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [coupon, setCoupon] = useState('');
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const [promotion, setPromotion] = useState<typePromotion>();
  const textInputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [open, setOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('usps');
  const [couriers, setCouriers] = useState<{label: string; value: string}[]>(
    [],
  );
  useEffect(() => {
    const loadCouriers = async () => {
      const response = await getAllCouriers();
      const items = response.map(courier => ({
        label: courier.name,
        value: courier.slug,
      }));
      setCouriers(items);
    };
    loadCouriers();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.user_id !== undefined) {
      dispatch(loadCart(user.user_id));
    }
    setRefreshing(false);
  };

  const handleApplyCoupon = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    const findPromotion = async () => {
      const promotion = await getPromotionByCode(coupon);
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

  useEffect(() => {
    if (promotion) {
      dispatch(setDiscountApplied(promotion.code));
    }
  }, [promotion]);

  const handleCheckOut = () => {
    if (promotion) {
      dispatch(setDiscountApplied(promotion.code));
      dispatch(
        setMoneyMustBePaid(
          (
            totalPrice -
            (totalPrice * promotion.discount_percent) / 100
          ).toFixed(2),
        ),
      );
    } else {
      dispatch(setMoneyMustBePaid(totalPrice.toFixed(2)));
    }
    console.log('Selected courier:', selectedCourier);
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <ListItemInCart cartData={cart}></ListItemInCart>
      {cart.some(item => item.status == 1) && (
        <View>
          <View style={styles.couponContainer}>
            <TextInput
              value={coupon}
              ref={textInputRef}
              onChangeText={text => setCoupon(text)}
              placeholder="Enter Coupon Code"
              style={styles.couponInput}
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
            <TouchableOpacity
              onPress={handleApplyCoupon}
              style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({cart.length})</Text>
              <Text style={styles.summaryValue}>${totalPrice}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>$0</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Import Charges</Text>
              <Text style={styles.summaryValue}>$0</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Courier</Text>
              <DropDownPicker
                open={open}
                value={selectedCourier}
                items={couriers}
                setOpen={setOpen}
                setValue={setSelectedCourier}
                setItems={setCouriers}
                placeholder="Select a courier"
                containerStyle={styles.dropdownContainerStyle}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                labelStyle={styles.dropdownLabel}
                selectedItemLabelStyle={styles.selectedItemLabel}
                listItemLabelStyle={styles.dropdownItemLabel}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                maxHeight={hp(20)} // Tăng maxHeight để hiển thị nhiều mục hơn
                zIndex={1000}
                dropDownDirection="BOTTOM" // Đảm bảo mở xuống dưới
              />
            </View>
            {promotion && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Discount ({promotion.code})
                </Text>
                <Text style={styles.discountValue}>
                  -$
                  {((totalPrice * promotion.discount_percent) / 100).toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalValue}>
                $
                {promotion
                  ? (
                      totalPrice -
                      (totalPrice * promotion.discount_percent) / 100
                    ).toFixed(2)
                  : totalPrice.toFixed(2)}
              </Text>
            </View>
            <Link href={'/moreScreen/order/shipTo'} asChild>
              <TouchableOpacity
                onPress={handleCheckOut}
                style={styles.btnCheckOut}>
                <Text style={styles.btnCheckOutText}>Check Out</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
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
        <FlatList
          data={[{}]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#40BFFF']} // Màu của vòng loading khi kéo
              tintColor="#40BFFF" // Màu trên iOS
            />
          }
          renderItem={() => renderContent()}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => 'cart-content'}
          style={styles.body}
          contentContainerStyle={{paddingBottom: hp(4)}}
        />
      )}
      <View style={{height: hp(5)}}></View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: hp(6),
    paddingHorizontal: wp(4),
  },
  body: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E4E8',
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#223263',
    marginLeft: wp(2),
  },
  contentContainer: {
    paddingBottom: hp(2),
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  couponInput: {
    flex: 1,
    height: hp(6),
    paddingHorizontal: wp(3),
    fontSize: wp(4),
    color: '#223263',
  },
  applyButton: {
    backgroundColor: '#40BFFF',
    height: hp(6),
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4),
    fontWeight: '600',
  },
  summaryContainer: {
    marginTop: hp(3),
    padding: wp(4),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  summaryLabel: {
    fontSize: wp(4),
    color: '#6B7280',
    width: wp(40),
  },
  summaryValue: {
    fontSize: wp(4),
    color: '#223263',
  },
  discountValue: {
    fontSize: wp(4),
    color: '#EF4444',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    paddingTop: hp(1),
    borderTopWidth: 1,
    borderTopColor: '#E0E4E8',
  },
  totalLabel: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#223263',
  },
  totalValue: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#40BFFF',
  },
  dropdownContainerStyle: {
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E4E8',
    borderRadius: wp(2),
    backgroundColor: '#F9FAFB',
    paddingHorizontal: wp(3),
    height: hp(6),
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#E0E4E8',
    borderRadius: wp(2),
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  dropdownLabel: {
    fontSize: wp(4),
    color: '#6B7280',
  },
  selectedItemLabel: {
    fontWeight: '600',
    color: '#40BFFF',
  },
  dropdownItemLabel: {
    fontSize: wp(4),
    color: '#223263',
  },
  btnCheckOut: {
    backgroundColor: '#40BFFF',
    height: hp(7),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: hp(2),
  },
  btnCheckOutText: {
    fontWeight: '700',
    fontSize: wp(4.5),
    color: '#FFFFFF',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  emptyCartText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#223263',
    marginTop: hp(2),
  },
  emptyCartSubText: {
    fontSize: wp(4),
    color: '#6B7280',
    textAlign: 'center',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  startShoppingButton: {
    backgroundColor: '#40BFFF',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    elevation: 2,
  },
  startShoppingButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontWeight: '600',
  },
});
