import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateUser} from '@/hooks/api/useUser';
import {useAppDispatch} from '@/redux/store';
const BtnSave = ({userName, data}: {userName: string; data: object}) => {
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    try {
      const result = await updateUser(userName, data, dispatch);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to update user');
    }
  };

  return (
    <TouchableOpacity onPress={handleSave} style={styles.btnSave}>
      <Text style={{fontWeight: 'bold', fontSize: wp(4), color: 'white'}}>
        Save
      </Text>
    </TouchableOpacity>
  );
};

export default BtnSave;

const styles = StyleSheet.create({
  btnSave: {
    marginTop: hp(2),
    backgroundColor: '#40BFFF',
    height: hp(8),
    marginBottom: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
});
