import {StyleSheet, Image, TouchableOpacity} from 'react-native';
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
      asChild>
      <TouchableOpacity style={styles.container}>
        <Image style={styles.image} source={item.image} resizeMode="contain" />
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width: wp(92),
    height: hp(25),
    marginHorizontal: wp(2),
    borderRadius: wp(3),
    overflow: 'hidden',
    // backgroundColor: '#FFFFFF', // Nền trắng để nổi bật
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.3)},
    shadowOpacity: 0.2,
    shadowRadius: wp(1.5),
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(3),
  },
});
