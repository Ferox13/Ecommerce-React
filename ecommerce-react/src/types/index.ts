import { User } from "firebase/auth";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  addNewProduct: (newProduct: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updatedData: Partial<Omit<Product, "id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  description?: string;
  quantity: number;
  image?: string;
}
export interface AuthContextType {
    user: User | null;
    logout: () => Promise<void>;
}
export interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  password?: string;
  confirmPassword?: string;
}
export interface CartContextType {
  cart: CartItem[];
  addProduct: (product: CartItem) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}
