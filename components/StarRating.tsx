import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; // Thư viện Icon phổ biến
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type Props = {
  rating: number; // Giá trị số sao
  maxStars?: number; // Số sao tối đa, mặc định là 5
  size?: number; // Kích thước của icon
  onRate?: (rating: number) => void; // Hàm callback khi click vào sao
  isEditable?: boolean; // Có cho phép chỉnh sửa rating không
};

const StarRating = ({
  rating,
  maxStars = 5,
  size = wp(5),
  onRate,
  isEditable = false,
}: Props) => {
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!isEditable}
          onPress={() => isEditable && onRate && onRate(i)}>
          <AntDesign
            name={i <= rating ? 'star' : 'staro'}
            size={size}
            color={i <= rating ? '#FFD700' : '#C0C0C0'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
