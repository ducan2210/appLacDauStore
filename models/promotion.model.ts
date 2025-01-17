export type typePromotion = {
  promotion_id: number;
  code: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  min_order_value: number | null;
  status: 'active' | 'expired';
};
