import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {uploadReviewImage} from '@/hooks/api/useCloudinary';
import {createReview} from '@/hooks/api/useReview';
const BtnSubmitReview = ({
  photos,
  product_id,
  user_id,
  rating,
  comment,
}: {
  photos: string[];
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
}) => {
  const handleSubmitReview = async () => {
    try {
      let urlPhotos = '';
      if (photos.length > 0) {
        const uploadedUrls = await uploadReviewImage(photos);
        const urlsString = uploadedUrls.join(', ');
        urlPhotos = urlsString;
      }
      console.log(urlPhotos, photos);
      const result = await createReview(
        product_id,
        user_id,
        rating,
        comment,
        urlPhotos,
      );
      Alert.alert('Success', 'Review submitted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
      throw new Error('Error when submit review');
    }
  };
  return (
    <TouchableOpacity
      style={{
        marginTop: hp(2),
        backgroundColor: '#40BFFF',
        height: hp(8),
        marginBottom: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
      }}
      onPress={handleSubmitReview}>
      <Text style={{fontSize: wp(5), fontWeight: 'bold', color: 'white'}}>
        Submit Review
      </Text>
    </TouchableOpacity>
  );
};

export default BtnSubmitReview;

const styles = StyleSheet.create({});
