import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import ListOrder from '@/components/orderComponent/listOrder';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Order = () => {
  const order = useSelector((state: RootState) => state.order.orders);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Order</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <ListOrder orderData={order}></ListOrder>
        <View style={{height: hp(12)}}></View>
      </ScrollView>
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
    // marginTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
});
