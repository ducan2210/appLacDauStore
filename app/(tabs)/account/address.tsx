import {
  ScrollView,
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
import {AntDesign, Feather} from '@expo/vector-icons';
import {Link} from 'expo-router';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import ListAddress from '@/components/addressComponent/listAddress';

const Address = () => {
  const address = useSelector((state: RootState) => state.address.addresses);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen />
          <Text style={styles.title}>Address</Text>
        </View>
        <Link href={'/moreScreen/accountSetting/addAddress'} asChild>
          <TouchableOpacity>
            <AntDesign name="plus" size={wp(6)} color="#40BFFF" />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <ListAddress addressData={address}></ListAddress>
      </ScrollView>
    </View>
  );
};

export default Address;

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
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(20), // Đảm bảo nội dung không bị che bởi nút
  },
  addressContainer: {
    marginTop: hp(2),
    padding: wp(4),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
  },
  name: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  address: {
    fontSize: wp(4),
    color: '#9098B1',
    marginVertical: hp(2),
  },
  phone: {
    fontSize: wp(4),
    color: '#9098B1',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  editButton: {
    backgroundColor: '#40BFFF',
    height: hp(8),
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  editButtonText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'white',
  },
  trashButton: {
    marginLeft: wp(4),
  },
  btnContainer: {
    position: 'absolute',
    bottom: wp(10),
    left: 0,
    right: 0,
    paddingHorizontal: wp(3),

    backgroundColor: '#f2f2f2', // Đặt màu nền nếu cần
  },
});
