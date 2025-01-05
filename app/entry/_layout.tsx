import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Stack, Tabs} from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="LoginUI" options={{headerShown: false}} />
      <Stack.Screen name="SignUpUI" options={{headerShown: false}} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
