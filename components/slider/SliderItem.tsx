import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ImageSliderType} from '@/data/SliderData';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';

type Props = {
  item: ImageSliderType;
  index: number;
};

const SliderItem = ({item, index}: Props) => {
  return (
    <Link
      href={{
        pathname: '/moreScreen/[offerSlider]',
        params: {offerSlider: item.title},
      }}
      style={styles.container}>
      <Image
        style={{width: wp(94), height: hp(30)}}
        source={item.image}></Image>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(94),
  },
});
