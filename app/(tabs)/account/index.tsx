import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {EvilIcons, Feather, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Link} from 'expo-router';
const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>
      <View style={styles.body}>
        <Link href={'/moreScreen/accountSetting/profile'} asChild>
          <TouchableOpacity style={styles.option}>
            <Feather
              name="user"
              size={24}
              color="#40BFFF"
              style={{width: wp(10)}}
            />
            <Text style={styles.optionTitle}>Profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.option}>
          <Feather
            name="shopping-bag"
            size={24}
            color="#40BFFF"
            style={{width: wp(10)}}
          />
          <Text style={styles.optionTitle}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#40BFFF"
            style={{width: wp(10)}}
          />
          <Text style={styles.optionTitle}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons
            name="payment"
            size={24}
            color="#40BFFF"
            style={{width: wp(10)}}
          />
          <Text style={styles.optionTitle}>Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
  },
  searchBar: {
    paddingVertical: hp(1),
    paddingLeft: wp(2),
    flexDirection: 'row',
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    flex: 0.9,
    borderRadius: wp(1),
  },
  body: {
    marginTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  option: {
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
  },
  optionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
