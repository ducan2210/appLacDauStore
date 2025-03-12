import {uploadReviewImage} from '@/hooks/api/useCloudinary';
import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';

const BtnUploadImageToCloudinary = ({photos}: {photos: string[]}) => {
  const handleUpload = async () => {
    if (photos.length === 0) {
      Alert.alert('Lỗi', 'Chưa có ảnh để upload!');
      return;
    }
    const uploadedUrls = await uploadReviewImage(photos);
    const urlsString = uploadedUrls.join(', ');
    console.log(urlsString);
  };

  return (
    <View>
      <Button title="Xác nhận & Upload Ảnh" onPress={handleUpload} />
    </View>
  );
};

export default BtnUploadImageToCloudinary;
