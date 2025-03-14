import axios from 'axios';
import {apiUrl} from './apiURL';
import {Platform} from 'react-native';

export const uploadReviewImage = async (photos: string[]) => {
  const formData = new FormData();

  for (let i = 0; i < photos.length; i++) {
    const uri = photos[i];
    const fileType = uri.split('.').pop(); // Lấy đuôi file (jpg, png, ...)

    formData.append('images', {
      uri: Platform.OS === 'ios' ? `file://${uri}` : uri, // ✅ Thêm `file://` nếu là iOS
      name: `image_${i}.${fileType}`,
      type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`, // ✅ Đổi `jpg` → `jpeg`
    } as any);
  }

  try {
    const response = await axios.post(`${apiUrl}/UploadReviewImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrls;
  } catch (error) {
    console.error('Image upload error', error);
    return null;
  }
};
