import {apiUrl} from '@/hooks/api/apiURL';
import {typeReviewByProductID} from '@/models/review.model';
import axios from 'axios';
export const getReviewByProductID = async (product_id: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetReviewByProductID?product_id=${product_id}`,
    );
    return response.data as typeReviewByProductID;
  } catch (error) {
    console.error('Load failed:', error);
    throw new Error('Load failed');
  }
};

export const createReview = async (
  product_id: number,
  user_id: number,
  rating: number,
  comment: string,
  photos: string,
) => {
  try {
    const response = await axios.post(`${apiUrl}/CreateReview`, {
      product_id,
      user_id,
      rating,
      comment,
      photos,
    });
    return response;
  } catch (error) {
    throw new Error('Create failed');
  }
};
