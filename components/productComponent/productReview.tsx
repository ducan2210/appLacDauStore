import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import StarRating from '../StarRating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {typeReview} from '@/models/review.model';
import ImageViewing from 'react-native-image-viewing';

const ProductReview = ({item}: {item: typeReview}) => {
  const photosArray = item.photos ? item.photos.split(', ') : [];
  const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
    setIsVisible(true);
  };

  const handleRequestClose = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header: Avatar, Username, Rating, Date */}
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/giay.png')}
        />
        <View style={styles.userInfo}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.username}>{item.User?.username}</Text>
            <StarRating rating={item.rating} />
          </View>
          <Text style={styles.date}>
            {new Date(item.updated_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {/* Photos */}
      {photosArray.length > 0 && (
        <FlatList
          horizontal
          data={photosArray}
          keyExtractor={(photo, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleImagePress(index)}>
              <Image source={{uri: item}} style={styles.photo} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {/* Comment */}
      <Text style={styles.comment}>{item.comment}</Text>

      {/* Image Viewer */}
      <ImageViewing
        images={photosArray.map(uri => ({uri}))}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={handleRequestClose}
      />
    </View>
  );
};

export default ProductReview;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    padding: wp(4),
    backgroundColor: '#FFFFFF', // Nền trắng để nổi bật
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Bóng đổ cho Android
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0', // Viền nhẹ
    paddingBottom: hp(1),
  },
  avatar: {
    width: wp(12), // Thu nhỏ avatar để cân đối
    height: wp(12),
    borderRadius: wp(6), // Bo tròn hoàn toàn
    borderWidth: 1,
    borderColor: '#E0E0E0', // Viền nhẹ
  },
  userInfo: {
    flex: 1,
    marginLeft: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#223263', // Màu xanh đậm cho nổi bật
  },
  date: {
    fontSize: wp(3.5),
    color: '#9098B1',
    marginTop: hp(0.5),
  },
  comment: {
    fontSize: wp(4),
    color: '#666666', // Màu xám đậm để dễ đọc
    marginTop: hp(1.5),
    lineHeight: wp(5), // Tăng khoảng cách dòng cho dễ đọc
  },
  photo: {
    width: wp(10),
    height: wp(10),
    marginTop: hp(1),
    marginRight: wp(2),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#E0E0E0', // Viền nhẹ cho ảnh
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
