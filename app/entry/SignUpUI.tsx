import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
import BtnSignUp from '@/components/BtnSignUp';
import {Feather} from '@expo/vector-icons';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '@/hooks/useValidate';
const SignUpUP = () => {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState<boolean>(false);

  const [errorsPassword, setErrorsPassword] = useState('');
  useEffect(() => {
    if (!validatePassword(password) && password.trim() !== '') {
      setErrorsPassword(
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.',
      );
    } else {
      setErrorsPassword('');
    }
  }, [password]);

  const [errorsPasswordAgain, setErrorsPasswordAgain] = useState('');
  useEffect(() => {
    if (
      !validatePasswordMatch(password, passwordAgain) &&
      passwordAgain.trim() !== ''
    ) {
      setErrorsPasswordAgain('Passwords do not match.');
    } else {
      setErrorsPasswordAgain('');
    }
  }, [passwordAgain]);

  const [errorsEmail, setErrorsEmail] = useState('');
  useEffect(() => {
    if (!validateEmail(email) && email.trim() !== '') {
      setErrorsEmail('Invalid email format.');
    } else {
      setErrorsEmail('');
    }
  }, [email]);

  return (
    <View style={{paddingTop: hp(7), flex: 1}}>
      <ScrollView style={styles.container}>
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
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={wp(5)} color="#9098B1" />

            <TextInput
              style={styles.textInput}
              placeholder="Your Email"
              onChangeText={text => setEmail(text)}
              value={email}
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
          </View>
          {errorsEmail && (
            <Text style={{color: 'red', marginBottom: hp(2)}}>
              {errorsEmail}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={wp(5)} color="#9098B1" />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={text => setPassword(text)}
              value={password}
              textContentType="none" // Tắt tính năng "Automatic Strong Passwords"
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={wp(5)}
                color="#9098B1"
              />
            </TouchableOpacity>
          </View>

          {errorsPassword && (
            <Text style={{color: 'red', marginBottom: hp(2)}}>
              {errorsPassword}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={wp(5)} color="#9098B1" />
            <TextInput
              style={styles.textInput}
              placeholder="Password Again"
              secureTextEntry={!showPasswordAgain}
              onChangeText={text => setPasswordAgain(text)}
              value={passwordAgain}
              textContentType="none" // Tắt tính năng "Automatic Strong Passwords"
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
            <TouchableOpacity
              onPress={() => setShowPasswordAgain(!showPasswordAgain)}>
              <Feather
                name={showPasswordAgain ? 'eye-off' : 'eye'}
                size={wp(5)}
                color="#9098B1"
              />
            </TouchableOpacity>
          </View>
        </View>
        {errorsPasswordAgain && (
          <Text style={{color: 'red', marginBottom: hp(2)}}>
            {errorsPasswordAgain}
          </Text>
        )}
        <View style={styles.footer}>
          <BtnSignUp
            userName={userName}
            email={email}
            password={password}
            passwordAgain={passwordAgain}></BtnSignUp>
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
      </ScrollView>
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
