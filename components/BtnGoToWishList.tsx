import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Link} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BtnGoToWishList = () => {
  return (
    <Link href={'/moreScreen/favoriteProduct'} asChild>
      <TouchableOpacity>
        <AntDesign style={{}} name="hearto" size={wp(7)} color="#9098B1" />
      </TouchableOpacity>
    </Link>
  );
};

export default BtnGoToWishList;

const styles = StyleSheet.create({});
