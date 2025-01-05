import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="[offerSlider]" options={{headerShown: false}} />
      <Stack.Screen name="favoriteProduct" options={{headerShown: false}} />
      <Stack.Screen name="product" options={{headerShown: false}} />
      <Stack.Screen name="notification" options={{headerShown: false}} />
      <Stack.Screen name="accountSetting" options={{headerShown: false}} />
      <Stack.Screen name="search" options={{headerShown: false}} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});