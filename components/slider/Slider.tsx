import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {SliderData} from '@/data/SliderData';
import SliderItem from './SliderItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
    setActiveIndex(index);
  };

  // Tự động lướt slider
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % SliderData.length; // Chuyển sang mục tiếp theo, quay lại đầu nếu hết
      scrollToIndex(nextIndex);
    }, 3000); // Chuyển đổi sau mỗi 3 giây

    // Dọn dẹp interval khi component unmount hoặc activeIndex thay đổi
    return () => clearInterval(interval);
  }, [activeIndex]); // Theo dõi activeIndex để đảm bảo interval hoạt động đúng

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SliderData}
        renderItem={({item, index}) => <SliderItem item={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={wp(96)}
        decelerationRate="fast"
        nestedScrollEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.paginationContainer}>
        {SliderData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.activeDot,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    height: hp(28),
    backgroundColor: '#F5F6FA',
    marginVertical: hp(1),
  },
  flatListContent: {
    // paddingHorizontal: wp(2),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(4),
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: wp(1.5),
    height: wp(1.5),
    borderRadius: wp(0.75),
    backgroundColor: '#D3D8E8',
    marginHorizontal: wp(1),
  },
  activeDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: '#40BFFF',
  },
});
