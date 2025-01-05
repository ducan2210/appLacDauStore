import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

const LoginUI = () => {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={{paddingTop: hp(7), flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <EvilIcons name="location" size={wp(10)} color="black" />
          <Text style={{fontSize: wp(5), fontWeight: '600'}}>
            TP.HCM, Việt Nam
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={{fontSize: wp(10), fontWeight: 'bold'}}>
            Let’s Sign You In
          </Text>
          <Text style={{fontSize: wp(8)}}>
            Welcome back, you’ve been missed!
          </Text>
          <View style={styles.infAccount}>
            <Text style={{fontSize: wp(6)}}>Username or Email</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={wp(7)} color="black" />

              <TextInput
                onChangeText={text => setUsername(text)}
                value={userName}
                style={styles.textInput}
                placeholder="Username"
              />
            </View>
            <Text style={{fontSize: wp(6), marginTop: hp(4)}}>Password</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="lock" size={wp(7)} color="black" />

              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <BtnSignin userName={userName} password={password}></BtnSignin>
          <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
            <Text style={{fontSize: wp(4)}}>Don't have an account?</Text>
            <TouchableOpacity style={{}}>
              <Link href={'/entry/SignUpUI'} asChild>
                <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                  {' '}
                  Sign up
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              ...styles.btnSignInNor,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp(2),
              paddingHorizontal: wp(3),
              backgroundColor: '#C6AB59',
            }}>
            <AntDesign name="google" size={wp(6)} color="white" />
            <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
              Connect with Google
            </Text>
            <View></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnSignInNor,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp(2),
              paddingHorizontal: wp(3),
              backgroundColor: '#3C79E6',
            }}>
            <FontAwesome5 name="facebook-f" size={wp(6)} color="white" />
            <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
              Connect with Facebook
            </Text>
            <View></View>
          </TouchableOpacity>
        </View>
        <View style={{height: hp(10)}}></View>
      </ScrollView>
    </View>
  );
};

export default LoginUI;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: wp(7),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  body: {},
  footer: {
    marginTop: hp(5),

    alignItems: 'center',
  },
  infAccount: {
    marginTop: hp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa icon và TextInput theo trục ngang
    borderColor: '#ccc',
    borderBottomWidth: wp(0.2),
    height: hp(6), // Chiều cao cố định cho input
  },
  textInput: {
    flex: 1, // Chiếm không gian còn lại
    padding: 0, // Xóa padding mặc định
    margin: 0, // Xóa margin mặc định
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
});
