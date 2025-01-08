import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useLocalSearchParams, useRouter} from 'expo-router'; // Import useRouter
import {AntDesign} from '@expo/vector-icons';
import ListProduct from '@/components/productComponent/listProduct';
import BtnBackScreen from '@/components/BtnBackScreen';

const OfferSlider = () => {
  const {offerSlider} = useLocalSearchParams();
  const router = useRouter(); // Sử dụng useRouter

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>{offerSlider}</Text>
        </View>
        <AntDesign name="search1" size={wp(7)} color="#9098B1" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Image
            style={{width: wp(94), height: hp(30), marginBottom: hp(2)}}
            source={require('../../assets/images/giay.png')}></Image>
        </View>
      </ScrollView>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {},
});
