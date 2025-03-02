export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  addNewProduct: (newProduct: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updatedData: Partial<Omit<Product, "id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}