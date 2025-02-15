import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
const SignUpUP = () => {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  return (
    <View style={{paddingTop: hp(7), flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{height: hp(15), width: hp(15), borderRadius: wp(7)}}
            source={require('../../assets/images/avt.jpg')}></Image>
          <Text
            style={{
              fontSize: wp(6),
              fontWeight: 'bold',
              marginVertical: hp(2),
            }}>
            Let's Get Started
          </Text>
          <Text
            style={{fontSize: wp(4), color: '#9098B1', marginBottom: hp(2)}}>
            Create an new account
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={wp(5)} color="#9098B1" />

            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              onChangeText={text => setUsername(text)}
              value={userName}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={wp(5)} color="#9098B1" />

            <TextInput
              style={styles.textInput}
              placeholder="Your Email"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={wp(5)} color="#9098B1" />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              value={password}
              textContentType="none" // Tắt tính năng "Automatic Strong Passwords"
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={wp(5)} color="#9098B1" />
            <TextInput
              style={styles.textInput}
              placeholder="Password Again"
              secureTextEntry={true}
              onChangeText={text => setPasswordAgain(text)}
              value={passwordAgain}
              textContentType="none" // Tắt tính năng "Automatic Strong Passwords"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnSignInNor}>
            <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
            <Text style={{fontSize: wp(4), color: '#9098B1'}}>
              Have a account?
            </Text>

            <Link href={'/entry/LoginUI'} asChild>
              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: 'bold',
                    color: '#40BFFF',
                  }}>
                  {' '}
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View style={{height: hp(10)}}></View>
      </View>
    </View>
  );
};

export default SignUpUP;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: wp(7),
  },
  header: {
    alignItems: 'center',
    marginTop: hp(5),
    justifyContent: 'center',
  },
  body: {marginTop: hp(2)},
  footer: {
    alignItems: 'center',
  },
  infAccount: {
    marginTop: hp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa icon và TextInput theo trục ngang
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    height: hp(6), // Chiều cao cố định cho input
    marginBottom: hp(2),
    padding: wp(3),
    borderRadius: wp(2),
  },
  textInput: {
    flex: 1, // Chiếm không gian còn lại
    padding: 0, // Xóa padding mặc định
    marginLeft: wp(2), // Xóa margin mặc định
    fontSize: wp(4),
  },
  btnSignInNor: {
    paddingVertical: hp(2),
    backgroundColor: '#40BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    width: wp(86),
  },
});
