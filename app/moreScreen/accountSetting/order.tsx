import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnAddAddress from '@/components/BtnAddAddress';
const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Address</Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            marginTop: hp(2),
            padding: wp(4),
            borderColor: '#9098B1',
            borderWidth: wp(0.1),
            borderRadius: wp(2),
          }}>
          <Text style={{fontSize: wp(4)}}>LQNSU346JK</Text>
          <Text style={{fontSize: wp(4)}}>
            Order at E-comm : August 1, 2017
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: wp(4)}}>Order Status</Text>
            <Text style={{fontSize: wp(4)}}>Shipping</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: wp(4)}}>Item</Text>
            <Text style={{fontSize: wp(4)}}>2 Items purchased</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: wp(4)}}>Price</Text>
            <Text style={{fontSize: wp(4)}}>$299,43</Text>
          </View>
        </View>
        <BtnAddAddress></BtnAddAddress>
      </View>
    </View>
  );
};

export default Order;

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
  body: {
    marginTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
});
