import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnLoginGG from '@/components/BtnLoginGG';
const index = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{height: hp(20), width: hp(20)}}
        source={require('../../assets/images/avt.jpg')}></Image>

      <BtnLoginGG></BtnLoginGG>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
