import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnSave from '@/components/BtnSave';
import DropDownPicker from 'react-native-dropdown-picker';

const ChangeGender = () => {
  const [selectedGender, setSelectedGender] = useState('male');
  const [open, setOpen] = useState(false); // Để mở/đóng dropdown
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Gender</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.titleBox}>Choose Gender</Text>
          <DropDownPicker
            open={open}
            value={selectedGender}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedGender}
            setItems={setItems}
            placeholder="Select Gender"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            selectedItemLabelStyle={styles.selectedItemLabel}
            listItemLabelStyle={styles.dropdownLabel}
          />
        </View>
        {/* <BtnSave /> */}
      </View>
    </View>
  );
};

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
  body: {
    flex: 1,
    marginTop: hp(2),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  titleBox: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginTop: hp(2),
    width: '100%',
    height: hp(6),
  },
  dropdown: {
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    backgroundColor: '#f0f0f0',
  },
  dropdownList: {
    marginTop: hp(1),
    backgroundColor: '#f0f0f0',
    borderRadius: wp(2),
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
  },
  dropdownLabel: {
    color: '#9098B1',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  selectedItemLabel: {
    color: '#40BFFF',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});

export default ChangeGender;
