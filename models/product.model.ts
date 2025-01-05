export type typeProduct = {
  product_id: number;
  category_id: number;
  supplier_id: number | null;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  stock: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
};
