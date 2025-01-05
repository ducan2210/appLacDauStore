import {StyleSheet, Text, View, ImageSourcePropType} from 'react-native';
import React from 'react';

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};
export const SliderData: ImageSliderType[] = [
  {
    title: 'hinh 1',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
  {
    title: 'hinh 2',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
  {
    title: 'hinh 3',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
  {
    title: 'hinh 4',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
  {
    title: 'hinh 5',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
  {
    title: 'hinh 6',
    image: require('../assets/images/giay.png'),
    description: 'abc',
  },
];
