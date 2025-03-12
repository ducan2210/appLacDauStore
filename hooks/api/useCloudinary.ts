import axios from 'axios';
import {apiUrl} from './apiURL';
import {Platform} from 'react-native';

// export const uploadReviewImage = async ({formData}: {formData: FormData}) => {
//   try {
//     const response = await axios.post(`${apiUrl}/uploadReviewImage`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log('Upload thành công:', response.data);
//     return response.data.url; // Giả sử API trả về URL của ảnh sau khi upload
//   } catch (error) {}
// };

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
    formData.forEach((value, key) => {
      console.log(`📝 ${key}:`, value);
    });

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
