import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const BtnLoginFB = () => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <View style={{flex: 0.2}}>
        <Image
          source={require('../assets/images/fb-logo.png')} // Đảm bảo rằng bạn đã thêm logo Google vào thư mục assets
          style={styles.logo}
        />
      </View>
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <Text style={styles.text}>Login with Facebook</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnLoginFB;

const styles = StyleSheet.create({
  button: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa icon và TextInput theo trục ngang
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    height: hp(6), // Chiều cao cố định cho input
    marginBottom: hp(2),
    padding: wp(2),
    borderRadius: wp(2),
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  logo: {
    width: wp(8), // Đặt kích thước cố định cho logo
    height: wp(8), // Đặt kích thước cố định cho logo
  },
  text: {
    color: '#9098B1',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
