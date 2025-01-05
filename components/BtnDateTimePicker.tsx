import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {format} from 'date-fns';
interface BtnDateTimePickerProps {
  onDateChange: (date: Date) => void;
}

const BtnDateTimePicker = (props: BtnDateTimePickerProps) => {
  const {onDateChange} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date()); // Lưu ngày hiện tại

  const showDatePicker = () => {
    setDatePickerVisibility(true); // Hiển thị picker
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false); // Ẩn picker
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate); // Lưu ngày người dùng chọn vào state 'date'
    onDateChange(selectedDate); // Gọi callback để truyền ngày đã chọn ra ngoài
    hideDatePicker(); // Ẩn picker sau khi chọn xong
  };

  return (
    <View>
      {/* Nút để mở DatePicker */}
      <TouchableOpacity onPress={showDatePicker}>
        <Entypo
          name="calendar"
          size={wp(7)}
          color="#40BFFF"
          style={{width: wp(10)}}
        />
      </TouchableOpacity>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date} // Gắn giá trị ngày hiện tại vào picker
        onConfirm={handleConfirm} // Lưu ngày khi chọn
        onCancel={hideDatePicker} // Đóng picker khi bấm hủy
        pickerStyleIOS={{
          width: wp(90), // Điều chỉnh chiều rộng modal
          alignItems: 'center',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BtnDateTimePicker;
