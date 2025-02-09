import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnAddAddress from '@/components/BtnAddAddress';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {typeAddress} from '@/models/address.model';
import {useLocalSearchParams} from 'expo-router';
import BtnSaveChangedAddress from '@/components/BtnSaveChangedAddress';
const ChangeAddress = () => {
  const [address, setAddress] = useState<typeAddress>();
  const {changeAddress} = useLocalSearchParams();
  useEffect(() => {
    try {
      const decodedAddress = changeAddress
        ? decodeURIComponent(changeAddress as string)
        : '[]';
      const dataArray = JSON.parse(decodedAddress);
      setAddress(dataArray);
    } catch (error) {
      console.error('Error parsing sort parameter:', error);
    }
  }, [changeAddress]);

  const user = useSelector((state: RootState) => state.user.user);
  const [fullName, setFullName] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address_id, setAddress_id] = useState(0);

  useEffect(() => {
    if (address) {
      setFullName(address.full_name);
      setSpecificAddress(address.address_line);
      setPhoneNumber(address.phone);
      setCity(address.city);
      setZipCode(address.postal_code);
      setCountry(address.country);
      setState(address.state);
      setAddress_id(address.address_id);
    }
  }, [address]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Edit Address</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>Full name</Text>
          <TextInput
            onChangeText={text => setFullName(text)}
            value={fullName}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Phone Number
          </Text>
          <TextInput
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Specific Address
          </Text>
          <TextInput
            onChangeText={text => setSpecificAddress(text)}
            value={specificAddress}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>City</Text>
          <TextInput
            onChangeText={text => setCity(text)}
            value={city}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            State/Province/Region
          </Text>
          <TextInput
            onChangeText={text => setState(text)}
            value={state}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>

        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>Zip Code</Text>
          <TextInput
            onChangeText={text => setZipCode(text)}
            value={zipCode}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>Country</Text>
          <TextInput
            onChangeText={text => setCountry(text)}
            value={country}
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <BtnSaveChangedAddress
          user_id={user.user_id}
          address_id={address_id}
          full_name={fullName}
          phone={phoneNumber}
          address_line={specificAddress}
          postal_code={zipCode}
          city={city}
          state={state}
          country={country}></BtnSaveChangedAddress>
      </ScrollView>
    </View>
  );
};

export default ChangeAddress;

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
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {},
  textInput: {
    fontSize: wp(4),
    height: hp(8),
    borderWidth: wp(0.1),
    borderRadius: wp(1),
    borderColor: '#9098B1',
    padding: wp(3),
    marginTop: hp(1),
  },
});
