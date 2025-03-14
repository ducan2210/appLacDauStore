import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import {useLocalSearchParams} from 'expo-router';
import {FontAwesome, AntDesign, EvilIcons} from '@expo/vector-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import BtnUploadImageToCloudinary from '@/components/BtnUploadImageToCloudinary';
import {getProductById} from '@/hooks/api/useProduct';
import BtnSubmitReview from '@/components/BtnSubmitReview';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';

const WriteReview = () => {
  const {writeReview, order_id} = useLocalSearchParams(); // Nhận productId từ OrderDetail
  const [product, setProduct] = useState<any>(null); // Lưu thông tin sản phẩm
  const [rating, setRating] = useState<number>(0); // Rating cho sản phẩm
  const [comment, setComment] = useState<string>(''); // Bình luận
  const [photos, setPhotos] = useState<string[]>([]); // Danh sách ảnh
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user?.user);
  useEffect(() => {
    const loadProduct = async () => {
      // Giả sử bạn có API để lấy thông tin sản phẩm
      const productData = await getProductById(Number(writeReview));
      if (productData) {
        setProduct(productData);
      }
      setLoading(false);
    };
    loadProduct();
  }, [writeReview]);

  const handleAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const selectedPhotos = response.assets.map(asset => asset.uri || '');
          setPhotos([...photos, ...selectedPhotos]);
        }
      },
    );
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const renderRatingStars = (currentRating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= currentRating ? 'star' : 'star-o'}
            size={wp(6)}
            color={i <= currentRating ? '#FFD700' : '#808080'}
            style={{marginRight: wp(1)}}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Write Review</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={styles.productContainer}>
          <Image
            source={{uri: product?.image_url}}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{product?.name}</Text>
        </View>

        <Text style={styles.sectionTitle}>Rate this product</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(rating)}</View>
        <Text style={styles.sectionTitle}>Write Your Review</Text>
        <TextInput
          placeholder="Write your review here"
          multiline={true}
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
        />
        <Text style={styles.sectionTitle}>Add Photos</Text>
        <View style={styles.photoContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{uri: photo}} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePhoto(index)}>
                <EvilIcons name="trash" size={wp(5)} color="#9098B1" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={styles.addPhotoButton}>
            <AntDesign name="plus" size={wp(8)} color="#9098B1" />
          </TouchableOpacity>
        </View>

        {user?.user_id !== undefined && (
          <BtnSubmitReview
            photos={photos}
            product_id={Number(writeReview)}
            user_id={user.user_id}
            rating={rating}
            comment={comment}
            order_id={Number(order_id)}
          />
        )}

        <View style={{height: hp(12)}} />
      </ScrollView>
    </View>
  );
};

export default WriteReview;

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
  body: {
    marginTop: hp(2),
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  productImage: {
    width: wp(20),
    height: wp(20),
    marginRight: wp(3),
    borderRadius: wp(2),
  },
  productName: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    justifyContent: 'center',
  },
  commentInput: {
    fontSize: wp(4),
    height: hp(20),
    width: wp(94),
    borderWidth: wp(0.1),
    borderRadius: wp(1),
    borderColor: '#9098B1',
    padding: wp(3),
    marginBottom: hp(2),
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  photoWrapper: {
    position: 'relative',
    width: wp(20),
    height: wp(20),
    marginRight: wp(2),
    marginBottom: wp(2),
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  removeButton: {
    position: 'absolute',
    top: -wp(2),
    right: -wp(2),
    backgroundColor: 'white',
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoButton: {
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#32CD32',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: hp(2),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
