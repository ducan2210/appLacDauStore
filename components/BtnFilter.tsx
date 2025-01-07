import {StyleSheet, Text, View} from 'react-native'; //-
import React from 'react'; //-
import {TouchableOpacity} from 'react-native'; //+
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; //+
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'; //+
import {Feather} from '@expo/vector-icons';

const BtnFilter = () => {
  return (
    <TouchableOpacity>
      <Feather
        style={{marginLeft: wp(4)}}
        name="filter"
        size={wp(6)}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default BtnFilter; //-
//-
const styles = StyleSheet.create({}); //-
