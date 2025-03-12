import {typeUser} from './user.model';

export type typeReview = {
  review_id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string | null;
  created_at: Date;
  updated_at: Date;
  User: typeUser;
  photos: string | null;
};

export type typeReviewByProductID = {
  reviews: typeReview[];
  total_review: number;
  average_rating: number;
};
