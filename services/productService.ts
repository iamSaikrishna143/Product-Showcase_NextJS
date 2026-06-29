import { Product } from '../types/product';
import productsData from '../data/products.json';

// In Next.js, importing JSON directly parses it as an array of products.
const products: Product[] = productsData as unknown as Product[];

export const productService = {
  getProducts: (): Product[] => {
    return products;
  },

  getProductById: (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  },

  getFeaturedProducts: (): Product[] => {
    return products.filter((product) => product.featured);
  },

  getCategories: (): string[] => {
    return Array.from(new Set(products.map((product) => product.category)));
  },

  getBrands: (): string[] => {
    return Array.from(new Set(products.map((product) => product.brand)));
  },

  getRelatedProducts: (productId: string, category: string, limit = 4): Product[] => {
    return products
      .filter((p) => p.category === category && p.id !== productId)
      .slice(0, limit);
  },
};
