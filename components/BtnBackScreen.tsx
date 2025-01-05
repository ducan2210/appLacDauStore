import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRouter} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BtnBackScreen = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <AntDesign name="left" size={wp(6)} color="#9098B1" />
    </TouchableOpacity>
  );
};

export default BtnBackScreen;

const styles = StyleSheet.create({});
