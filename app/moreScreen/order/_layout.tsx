import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="shipTo" options={{headerShown: false}} />
      <Stack.Screen name="paymentMethod" options={{headerShown: false}} />
      <Stack.Screen
        name="chooseCreditOrDebitCard"
        options={{headerShown: false}}
      />
      <Stack.Screen name="success" options={{headerShown: false}} />
      <Stack.Screen name="paymentScreen" options={{headerShown: false}} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
