import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
const Success = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="checkcircle" size={wp(15)} color="#40BFFF" />
      <Text style={styles.title}>Success</Text>
      <Text style={{fontSize: wp(4), color: '#9098B1', marginTop: hp(2)}}>
        Thank you for shopping with LacDau
      </Text>
      <Link href={'/(tabs)/home'} asChild>
        <TouchableOpacity
          style={{
            backgroundColor: '#40BFFF',
            height: hp(8),
            width: wp(94),
            marginTop: hp(2),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(2),
          }}>
          <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
            Continue shopping
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(6),
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: wp(8),
    fontWeight: 'bold',

    marginTop: hp(2),
  },
});
