import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Link, router} from 'expo-router';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/entry/LoginUI'); // Thay 'home' bằng tên màn hình bạn muốn chuyển đến
    }, 1500); // 3000ms = 3s

    return () => clearTimeout(timer); // Dọn dẹp bộ hẹn giờ khi component bị unmount
  }, [router]);
  return (
    <View style={styles.container}>
      <Image
        style={{height: hp(20), width: hp(20), borderRadius: wp(7)}}
        source={require('../assets/images/avt.jpg')}></Image>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#40BFFF',
  },
});
