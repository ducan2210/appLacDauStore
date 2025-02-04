import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BtnAddAddress from '@/components/BtnAddAddress';
const AddAddress = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Add Address</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Country or region
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            First name
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>Last Name</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Street Address
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Street Address 2 (Optional)
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>City</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            State/Province/Region
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>Zip Code</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
            Phone Number
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}></TextInput>
        </View>
        <BtnAddAddress></BtnAddAddress>
      </ScrollView>
    </View>
  );
};

export default AddAddress;

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
