export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  rating?: number;
  isNew?: boolean;
  resultat?: any;
  id?: string;

}
