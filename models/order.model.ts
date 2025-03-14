import {typePaymentMethod} from './paymentMethod.model';
import {typeReview} from './review.model';

export type typeOrder = {
  order_id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  payment_method_id: number | null;
  created_at: Date;
  updated_at: Date;
  order_information: string;
  discount_applied: string;
};

export type typeOrderItems = {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  Product: {
    product_id: number;
    name: string;
    price: number;
    image_url: string;
  };
};

export type typeOrderInformation = {
  order_id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  payment_method_id: number | null;
  created_at: Date;
  updated_at: Date;
  order_information: string;
  discount_applied: string;
  OrderItems: typeOrderItems[]; // Mảng các orderItem, không phải tuple
  PaymentMethod: typePaymentMethod;
  Reviews: typeReview[];
};
