import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ChangeAvatar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Avatar</Text>
      </View>
      <View style={styles.body}></View>
    </View>
  );
};

export default ChangeAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',

    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    marginBottom: hp(2),
  },
  body: {marginTop: hp(2)},
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
});
