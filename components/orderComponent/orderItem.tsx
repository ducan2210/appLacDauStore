import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BtnBackScreen from '../BtnBackScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {typeOrder} from '@/models/order.model';
import {AntDesign} from '@expo/vector-icons';
import {Link} from 'expo-router';
const OrderItem = ({item}: {item: typeOrder}) => {
  const DashedDivider = () => {
    return <View style={styles.dashedDivider} />;
  };
  return (
    <Link
      href={{
        pathname: '/(tabs)/account/[orderDetail]',
        params: {
          orderDetail: item.order_id,
        },
      }}
      asChild>
      <TouchableOpacity
        style={{
          marginTop: hp(2),
          padding: wp(4),
          borderColor: '#9098B1',
          borderWidth: wp(0.1),
          borderRadius: wp(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: wp(4), marginBottom: hp(1)}}>
            Order ID: {item.order_id}
          </Text>
          <AntDesign name="right" size={wp(5)} color="#9098B1" />
        </View>
        <Text style={{fontSize: wp(4), marginBottom: hp(1)}}>
          Order at E-comm : {new Date(item.created_at).toLocaleString()}
        </Text>
        <DashedDivider />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: wp(4)}}>Order Status</Text>
          <Text style={{fontSize: wp(4)}}>{item.status}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: wp(4)}}>Price</Text>
          <Text style={{fontSize: wp(4)}}>${item.total_amount}</Text>
        </View>
        <View style={{}}>
          <DashedDivider />
          {item.order_information ? (
            item.order_information.split(',').map((info, index) => (
              <Text style={{fontSize: wp(4)}} key={index}>
                {info.trim()}
              </Text>
            ))
          ) : (
            <Text style={{fontSize: wp(4)}}>
              No order information available
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default OrderItem;

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
  dashedDividerContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  dashedDivider: {
    width: '100%',
    height: hp(0.1),
    borderWidth: wp(0.3),
    borderColor: '#9098B1',
    borderStyle: 'dashed',
    marginVertical: hp(1),
  },
});
