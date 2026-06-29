import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discountTotal: number;
  gst: number;
  shipping: number;
  grandTotal: number;
}
