import {
  Button,
  KeyboardAvoidingView,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
import BtnSignin from '@/components/BtnSignin';
import BtnLoginGG from '@/components/BtnLoginGG';
import BtnLoginFB from '@/components/BtnLoginFB';

const LoginUI = () => {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
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
          Welcome To Lac Dau Store
        </Text>
        <Text style={{fontSize: wp(4), color: '#9098B1', marginBottom: hp(2)}}>
          Sign in to continue
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.infAccount}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={wp(5)} color="#9098B1" />

            <TextInput
              onChangeText={text => setUsername(text)}
              value={userName}
              style={styles.textInput}
              placeholder="Username or Email"
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
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
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <BtnSignin userName={userName} password={password}></BtnSignin>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <BtnLoginGG></BtnLoginGG>

        <BtnLoginFB></BtnLoginFB>
        <TouchableOpacity style={{marginBottom: hp(1)}}>
          <Link href={'/entry/SignUpUI'} asChild>
            <Text
              style={{fontSize: wp(4), fontWeight: 'bold', color: '#40BFFF'}}>
              {' '}
              Forgot Password?
            </Text>
          </Link>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: wp(4), color: '#9098B1'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity style={{}}>
            <Link href={'/entry/SignUpUI'} asChild>
              <Text
                style={{fontSize: wp(4), fontWeight: 'bold', color: '#40BFFF'}}>
                {' '}
                Register
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginUI;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(7),
  },
  header: {
    alignItems: 'center',
    marginTop: hp(5),
    justifyContent: 'center',
  },
  body: {},
  footer: {
    alignItems: 'center',
  },
  infAccount: {
    marginTop: hp(2),
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
    backgroundColor: '#AE8C8C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    width: wp(86),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  line: {
    flex: 1,
    height: hp(0.1),
    backgroundColor: '#9098B1',
  },
  orText: {
    marginHorizontal: wp(2),
    fontSize: wp(4),
    color: '#9098B1',
    fontWeight: 'bold',
  },
});
