import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{headerShown: false}} />
      <Stack.Screen name="changeEmail" options={{headerShown: false}} />
      <Stack.Screen name="changeBirthday" options={{headerShown: false}} />
      <Stack.Screen name="changeGender" options={{headerShown: false}} />
      <Stack.Screen name="changePassword" options={{headerShown: false}} />
      <Stack.Screen name="changePhoneNumber" options={{headerShown: false}} />
      <Stack.Screen name="changeName" options={{headerShown: false}} />
      <Stack.Screen name="changeAvatar" options={{headerShown: false}} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
