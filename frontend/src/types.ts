export type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
};

export type OrderItem = {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product?: Product;
};

export type Order = {
  id: number;
  customer_name: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
};

