export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discount: number; // percentage (e.g. 10 for 10% off)
  rating: number;
  stock: number;
  images: string[];
  specifications: Record<string, string>;
  featured: boolean;
}
