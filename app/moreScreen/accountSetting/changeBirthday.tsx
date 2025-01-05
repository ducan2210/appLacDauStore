import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnDateTimePicker from '@/components/BtnDateTimePicker';
import {format} from 'date-fns';
import BtnSave from '@/components/BtnSave';

const ChangeBirthday = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date); // Cập nhật ngày được chọn vào state
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Birthday</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.titleBox}>Your Birthday</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: wp(0.1),
              justifyContent: 'space-between',
              paddingHorizontal: wp(3),
              paddingVertical: wp(2),
              borderColor: '#9098B1',
              borderRadius: wp(2),
              marginTop: hp(2),
            }}>
            <Text style={styles.selectedDateText}>
              {selectedDate
                ? format(selectedDate, 'dd/MM/yyyy')
                : 'No date selected'}
            </Text>
            <BtnDateTimePicker onDateChange={handleDateChange} />
          </View>
        </View>
        <View>
          {/* <BtnSave userName=''></BtnSave> */}
        </View>
      </View>
    </View>
  );
};

export default ChangeBirthday;

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
  selectedDateText: {
    fontSize: wp(5),
    // color: '#9098B1',
  },
  titleBox: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
});
