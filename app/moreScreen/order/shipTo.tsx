import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Link} from 'expo-router';
import {AntDesign, Feather} from '@expo/vector-icons';
import BtnBackScreen from '@/components/BtnBackScreen';
import ListAddress from '@/components/addressComponent/listAddress';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
const ShipTo = () => {
  const address = useSelector((state: RootState) => state.address.addresses);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen />
          <Text style={styles.title}>Ship To</Text>
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
        <View style={styles.btnContainer}></View>
      </ScrollView>
      <Link href={'/moreScreen/order/paymentMethod'} asChild>
        <TouchableOpacity
          style={{
            backgroundColor: '#40BFFF',
            height: hp(8),
            marginBottom: hp(7),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(2),
          }}>
          <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
            Next
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ShipTo;

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
    paddingBottom: hp(5), // Đảm bảo nội dung không bị che bởi nút
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
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(3),

    backgroundColor: '#f2f2f2', // Đặt màu nền nếu cần
  },
});
