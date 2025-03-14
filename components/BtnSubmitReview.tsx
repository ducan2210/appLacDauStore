import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {uploadReviewImage} from '@/hooks/api/useCloudinary';
import {createReview} from '@/hooks/api/useReview';
import {router} from 'expo-router';

const BtnSubmitReview = ({
  photos,
  product_id,
  user_id,
  order_id,
  rating,
  comment,
}: {
  photos: string[];
  product_id: number;
  user_id: number;
  order_id: number;
  rating: number;
  comment: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0 || rating == null) {
      Alert.alert('Error', 'Please provide a star rating.');
      return;
    }

    setLoading(true);
    try {
      let urlPhotos = '';
      if (photos.length > 0) {
        const uploadedUrls = await uploadReviewImage(photos);
        const urlsString = uploadedUrls.join(', ');
        urlPhotos = urlsString;
      }
      const result = await createReview(
        product_id,
        user_id,
        rating,
        comment,
        urlPhotos,
        order_id,
      );
      Alert.alert('Success', 'Review submitted successfully');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
      throw new Error('Error when submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleSubmitReview}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>Submit Review</Text>
      )}
    </TouchableOpacity>
  );
};

export default BtnSubmitReview;

const styles = StyleSheet.create({
  button: {
    marginTop: hp(2),
    backgroundColor: '#40BFFF',
    height: hp(8),
    marginBottom: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  buttonText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'white',
  },
});
