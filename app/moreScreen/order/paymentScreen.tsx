import {createPaymentUrl} from '@/hooks/api/usePayment';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Keyboard,
  Alert,
  Pressable,
} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
const PaymentScreen = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentUrl();

    // amount: Math.floor(total * 100),

    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: response.clientSecret,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }

    //     4242 4242 4242 4242 Succeeds and immediately processes the payment.
    //     4000 0025 0000 3155 Requires authentication. Stripe will trigger a modal asking for the customer to authenticate.
    //     4000 0000 0000 9995 Always fails with a decline code of insufficient_funds.

    // 4. If payment ok -> create the order
    // onCreateOrder();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán đơn hàng</Text>
      <Text style={styles.amount}>Số tiền: 100.000 VNĐ</Text>
      <TouchableOpacity onPress={onCheckout} style={styles.button}>
        <Text style={styles.buttonText}>
          Checkout
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
    padding: 20,
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
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default PaymentScreen;
