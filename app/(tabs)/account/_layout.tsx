import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="address" options={{headerShown: false}} />
      <Stack.Screen name="order" options={{headerShown: false}} />
      <Stack.Screen name="profile" options={{headerShown: false}} />
      <Stack.Screen name="[orderDetail]" options={{headerShown: false}} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
