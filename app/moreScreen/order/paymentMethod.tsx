import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Link, router} from 'expo-router';
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import {createPaymentUrl} from '@/hooks/api/usePayment';
import {useStripe} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import BtnOrderConfirmation from '@/components/BtnOrderConfirmation';
import {createOrder} from '@/hooks/api/useOrder';
import {useAppDispatch} from '@/redux/store';
const PaymentMethod = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Cash on Delivery');
  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const discountApplied = useSelector(
    (state: RootState) => state.cart.discountApplied,
  );
  const moneyMustBePaid = useSelector(
    (state: RootState) => state.cart.moneyMustBePaid,
  );
  const orderInformation = useSelector(
    (state: RootState) => state.address.orderInformation,
  );
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const onCreateOrder = () => {
    if (user) {
      createOrder(
        cart,
        dispatch,
        user.user_id,
        moneyMustBePaid,
        orderInformation,
        discountApplied,
        1,
      );
    } else {
      // Xử lý trường hợp user là null
      console.error('User is null');
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async (amount: number) => {
    setIsLoading(true);

    // 1. Create a payment intent
    console.log('Creating payment intent...');
    const response = await createPaymentUrl(amount);

    if (!response || response.error) {
      Alert.alert('Something went wrong');
      setIsLoading(false);
      return;
    }

    console.log('Payment intent created:', response);

    // 2. Initialize the Payment sheet
    console.log('Initializing payment sheet...');
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'LacDauStore',
      paymentIntentClientSecret: response.clientSecret,
      returnURL: 'https://www.facebook.com', // Thêm returnURL vào đây
    });

    if (initResponse.error) {
      console.log('Error initializing payment sheet:', initResponse.error);
      Alert.alert('Something went wrong');
      setIsLoading(false);
      return;
    }

    console.log('Payment sheet initialized');

    // 3. Present the Payment Sheet from Stripe
    console.log('Presenting payment sheet...');
    const {error} = await presentPaymentSheet();

    if (error) {
      console.log('Error presenting payment sheet:', error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your payment was successful!');
      // 4. If payment ok -> create the order
      onCreateOrder();
      router.push('/moreScreen/order/success');
    }

    setIsLoading(false);
  };

  //     4242 4242 4242 4242 Succeeds and immediately processes the payment.
  //     4000 0025 0000 3155 Requires authentication. Stripe will trigger a modal asking for the customer to authenticate.
  //     4000 0000 0000 9995 Always fails with a decline code of insufficient_funds.

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Payment</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => handleSelectPaymentMethod('Cash on Delivery')}
          style={styles.option}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome6
              name="money-bill-transfer"
              size={24}
              color="#40BFFF"
              style={{width: wp(10)}}
            />
            <Text style={styles.optionTitle}>Cash on Delivery</Text>
          </View>
          {selectedPaymentMethod == 'Cash on Delivery' && (
            <MaterialIcons
              name="radio-button-checked"
              size={hp(2)}
              color="black"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectPaymentMethod('Paypal')}
          style={styles.option}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo
              name="paypal"
              size={24}
              color="#40BFFF"
              style={{width: wp(10)}}
            />
            <Text style={styles.optionTitle}>Paypal</Text>
          </View>
          {selectedPaymentMethod == 'Paypal' && (
            <MaterialIcons
              name="radio-button-checked"
              size={hp(2)}
              color="black"
            />
          )}
        </TouchableOpacity>
        {selectedPaymentMethod === 'Cash on Delivery' ? (
          user ? (
            <BtnOrderConfirmation
              user_id={user.user_id}
              total_amount={moneyMustBePaid}
              order_information={orderInformation}
              discount_applied={discountApplied}
              payment_method_id={2}
            />
          ) : (
            <Text style={{color: 'red'}}>User is not logged in</Text>
          )
        ) : (
          <TouchableOpacity
            onPress={() => onCheckout(moneyMustBePaid)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Pay ${moneyMustBePaid}
              {isLoading && <ActivityIndicator />}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PaymentMethod;

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
  searchBar: {
    paddingVertical: hp(1),
    paddingLeft: wp(2),
    flexDirection: 'row',
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    flex: 0.9,
    borderRadius: wp(1),
  },
  body: {
    flex: 1,
    marginTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  option: {
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(94),
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#40BFFF',
    bottom: hp(6),
    width: wp(90),
    alignSelf: 'center',
    padding: wp(5),
    borderRadius: wp(2),
    alignItems: 'center',
    height: hp(8),
  },

  buttonText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'white',
  },
});
