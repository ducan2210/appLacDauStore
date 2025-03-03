import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import {Link} from 'expo-router';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {RootState} from '@/redux/rootReducer';
import {useSelector} from 'react-redux';
const Profile = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={{flexDirection: 'row'}}>
          <Link href={'/moreScreen/accountSetting/changeAvatar'} asChild>
            <TouchableOpacity>
              <Image
                style={{borderRadius: wp(100), height: wp(20), width: wp(20)}}
                source={require('../../../assets/images/giay.png')}></Image>
            </TouchableOpacity>
          </Link>
          <Link href={'/moreScreen/accountSetting/changeName'} asChild>
            <TouchableOpacity
              style={{
                marginLeft: wp(2),
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                {user?.username}
              </Text>
              <Text style={{fontSize: wp(5), color: '#9098B1'}}>
                {user?.email}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={{marginTop: hp(5)}}>
          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="gender-female"
                size={wp(7)}
                color="#40BFFF"
                style={{width: wp(10)}}
              />
              <Text style={styles.optionTitle}>Gender</Text>
            </View>
            <Link href={'/moreScreen/accountSetting/changeGender'} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.optionTitle,
                    color: '#9098B1',
                    marginRight: wp(4),
                  }}>
                  Gioi tinh
                </Text>
                <AntDesign name="right" size={wp(6)} color="#9098B1" />
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo
                name="calendar"
                size={wp(7)}
                color="#40BFFF"
                style={{width: wp(10)}}
              />
              <Text style={styles.optionTitle}>Birthday</Text>
            </View>
            <Link href={'/moreScreen/accountSetting/changeBirthday'} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.optionTitle,
                    color: '#9098B1',
                    marginRight: wp(4),
                  }}>
                  01/01/2000
                </Text>
                <AntDesign name="right" size={wp(6)} color="#9098B1" />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="email-outline"
                size={wp(7)}
                color="#40BFFF"
                style={{width: wp(10)}}
              />
              <Text style={styles.optionTitle}>Email</Text>
            </View>
            <Link href={'/moreScreen/accountSetting/changeEmail'} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.optionTitle,
                    color: '#9098B1',
                    marginRight: wp(4),
                  }}>
                  {user?.email}
                </Text>
                <AntDesign name="right" size={wp(6)} color="#9098B1" />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="phone-portrait-sharp"
                size={wp(7)}
                color="#40BFFF"
                style={{width: wp(10)}}
              />
              <Text style={styles.optionTitle}>Phone Number</Text>
            </View>
            <Link href={'/moreScreen/accountSetting/changePhoneNumber'} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.optionTitle,
                    color: '#9098B1',
                    marginRight: wp(4),
                  }}>
                  {user?.phone ? user?.phone : 'Chưa xác thực'}
                </Text>
                <AntDesign name="right" size={wp(6)} color="#9098B1" />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="lock-outline"
                size={wp(7)}
                color="#40BFFF"
                style={{width: wp(10)}}
              />
              <Text style={styles.optionTitle}>Change Password</Text>
            </View>
            <Link href={'/moreScreen/accountSetting/changePassword'} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.optionTitle,
                    color: '#9098B1',
                    marginRight: wp(4),
                  }}>
                  ********
                </Text>
                <AntDesign name="right" size={wp(6)} color="#9098B1" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

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
  option: {
    marginBottom: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
