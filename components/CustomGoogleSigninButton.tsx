import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CustomGoogleSigninButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const CustomGoogleSigninButton: React.FC<CustomGoogleSigninButtonProps> = ({
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}>
      <View style={{flex: 0.3}}>
        <Image
          source={require('../assets/images/google-logo.png')} // Đảm bảo rằng bạn đã thêm logo Google vào thư mục assets
          style={styles.logo}
        />
      </View>
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Text style={styles.text}>Login with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa icon và TextInput theo trục ngang
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    height: hp(6), // Chiều cao cố định cho input
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: wp(2),
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  logo: {
    width: wp(5), // Đặt kích thước cố định cho logo
    height: wp(5), // Đặt kích thước cố định cho logo
    marginRight: wp(2),
  },
  text: {
    color: '#9098B1',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});

export default CustomGoogleSigninButton;
