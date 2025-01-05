import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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
            Getting Started
          </Text>
          <Text style={{fontSize: wp(8)}}>Create an account to continue!</Text>
          <View style={styles.infAccount}>
            <Text style={{fontSize: wp(6)}}>Email</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="mail" size={wp(7)} color="black" />
              <TextInput style={styles.textInput} placeholder="Email" />
            </View>
            <Text style={{fontSize: wp(6), marginTop: hp(4)}}>Username</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={wp(7)} color="black" />
              <TextInput style={styles.textInput} placeholder="Username" />
            </View>
            <Text style={{fontSize: wp(6), marginTop: hp(4)}}>Password</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="lock" size={wp(7)} color="black" />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnSignInNor}>
            <Text style={{color: 'white', fontSize: wp(4), fontWeight: 'bold'}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
            <Text style={{fontSize: wp(4)}}>Already have an account?</Text>

            <Link href={'/entry/LoginUI'} asChild>
              <TouchableOpacity style={{}}>
                <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                  {' '}
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
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

export default SignUpUP;
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
