import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { getCartItems, addToCart, updateCartItem, removeFromCart } from "../api/cart";
import { Product } from "../types";

// Define interfaces for our types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  // Add other properties as needed
}

interface CartContextType {
  cart: CartItem[];
  addProduct: (product: Product) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}

interface CartProviderProps {
  children: ReactNode;
}

// Create context with type
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then(items => setCart(items as CartItem[]));
    }
  }, [user]);

  const addProduct = async (product: CartItem): Promise<void> => {
    if (!user) return;
    await addToCart(user.uid, product);
    const items = await getCartItems(user.uid);
    setCart(items as CartItem[]);
  };
  const updateQuantity = async (productId: string, quantity: number): Promise<void> => {
    if (!user) return;
    await updateCartItem(user.uid, productId, quantity);
    const items = await getCartItems(user.uid);
    setCart(items as CartItem[]);
  };
  const removeProduct = async (productId: string): Promise<void> => {
    if (!user) return;
    await removeFromCart(user.uid, productId);
    const items = await getCartItems(user.uid);
    setCart(items as CartItem[]);
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, updateQuantity, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};