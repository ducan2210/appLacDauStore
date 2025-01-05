import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {SliderData} from '@/data/SliderData';
import SliderItem from './SliderItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Trạng thái lưu chỉ số của mục hiện tại

  // Hàm để xử lý sự kiện cuộn của FlatList
  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index); // Cập nhật chỉ số khi người dùng cuộn
    }
  };
  return (
    <View>
      <FlatList
        data={SliderData}
        renderItem={({item, index}) => (
          <SliderItem item={item} index={index}></SliderItem>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        nestedScrollEnabled={true} // Thêm dòng này
        onViewableItemsChanged={onViewableItemsChanged} // Theo dõi các mục đang hiển thị
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}} // Chỉ báo nếu ít nhất 50% mục là có thể nhìn thấy
      />
      {/* Các chấm tròn phân trang */}
      <View style={styles.paginationContainer}>
        {SliderData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.activeDot, // Đổi màu chấm tròn khi mục đó được chọn
            ]}
            onPress={() => setActiveIndex(index)} // Nhấn vào chấm tròn để chuyển tới mục tương ứng
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: wp(1.5),
    height: wp(1.5),
    borderRadius: 5,
    backgroundColor: '#EBF0FF',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#40BFFF', // Màu chấm tròn khi mục đó được chọn
    width: wp(2),
    height: wp(2),
  },
});
