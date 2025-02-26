export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
}