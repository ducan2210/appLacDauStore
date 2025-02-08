import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Link} from 'expo-router';
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
const PaymentMethod = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Payment</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons
            name="payment"
            size={24}
            color="#40BFFF"
            style={{width: wp(10)}}
          />
          <Text style={styles.optionTitle}>Credit Card Or Debit</Text>
        </TouchableOpacity>

        <Link href={'/moreScreen/order/paymentScreen'} asChild>
          <TouchableOpacity style={styles.option}>
            <Entypo
              name="paypal"
              size={24}
              color="#40BFFF"
              style={{width: wp(10)}}
            />
            <Text style={styles.optionTitle}>Paypal</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons
            name="bank"
            size={24}
            color="#40BFFF"
            style={{width: wp(10)}}
          />
          <Text style={styles.optionTitle}>Bank Transfer</Text>
        </TouchableOpacity>
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
    width: wp(100),
  },
  optionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
