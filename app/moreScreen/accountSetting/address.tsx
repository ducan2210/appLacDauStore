import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnAddAddress from '@/components/BtnAddAddress';
import {Feather} from '@expo/vector-icons';
const Address = () => {
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
          <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>Priscekila</Text>
          <Text
            style={{fontSize: wp(4), color: '#9098B1', marginVertical: hp(2)}}>
            3711 Spring Hill Rd undefined Tallahassee, Nevada 52874 United
            States
          </Text>
          <Text style={{fontSize: wp(4), color: '#9098B1'}}>
            +99 1234567890
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#40BFFF',
                height: hp(8),
                width: wp(25),

                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: wp(2),
              }}>
              <Text
                style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: wp(4)}}>
              <Feather name="trash" size={wp(7)} color="#9098B1" />
            </TouchableOpacity>
          </View>
        </View>
        <BtnAddAddress></BtnAddAddress>
      </View>
    </View>
  );
};

export default Address;

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
