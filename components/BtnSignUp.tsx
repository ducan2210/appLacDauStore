import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {router} from 'expo-router';
import {useAppDispatch} from '@/redux/store';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {createUser} from '@/hooks/api/useUser';
const BtnSignUp = ({
  userName,
  email,
  password,
  passwordAgain,
}: {
  userName: string;
  email: string;
  password: string;
  passwordAgain: string;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch(); // Dùng hook dispatch với kiểu rõ ràng

  const handleSignUp = async () => {
    setLoading(true); // Hiển thị trạng thái loading nếu cần
    const response = await createUser(userName, email, password);
    if (response.message) {
      Alert.alert(
        'Notification',
        response.message + ', back to login screen',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => router.push('/entry/LoginUI'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('Error', response.error);
    }
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.btnSignUp}
      onPress={handleSignUp}
      disabled={loading} // Vô hiệu hóa nút khi đang loading
    >
      <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
        {loading ? 'Loading...' : 'Sign Up'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSignUp: {
    paddingVertical: hp(2),
    backgroundColor: '#40BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    width: wp(86),
  },
});

export default BtnSignUp;
