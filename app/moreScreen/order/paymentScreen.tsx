import {createPaymentUrl} from '@/hooks/api/usePayment';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useStripe} from '@stripe/stripe-react-native';
import {router} from 'expo-router';
const PaymentScreen = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    setIsLoading(true);

    // 1. Create a payment intent
    console.log('Creating payment intent...');
    const response = await createPaymentUrl();

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
      // onCreateOrder();
      router.push('/moreScreen/order/success');
    }

    setIsLoading(false);
  };

  //     4242 4242 4242 4242 Succeeds and immediately processes the payment.
  //     4000 0025 0000 3155 Requires authentication. Stripe will trigger a modal asking for the customer to authenticate.
  //     4000 0000 0000 9995 Always fails with a decline code of insufficient_funds.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán đơn hàng</Text>
      <Text style={styles.amount}>Số tiền: 100.000 VNĐ</Text>
      <TouchableOpacity onPress={onCheckout} style={styles.button}>
        <Text style={styles.buttonText}>
          Check Out
          {isLoading && <ActivityIndicator />}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(6),
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 18,
    marginBottom: 20,
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

export default PaymentScreen;
