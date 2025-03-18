import { createContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { getCartItems, addToCart, updateCartItem, removeFromCart } from "../api/cart";
import { CartItem, CartContextType } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then(items => setCart(items as unknown as CartItem[]));
    }
  }, [user]);

  const addProduct = async (product: CartItem): Promise<void> => {
    if (!user) return;
    const validProduct = { ...product, image: product.image ?? "" };
    await addToCart(user.uid, validProduct);
    const items = await getCartItems(user.uid);
    setCart(items as unknown as CartItem[]);
  };
  const updateQuantity = async (productId: string, quantity: number): Promise<void> => {
    if (!user) return;
    await updateCartItem(user.uid, productId, quantity);
    const items = await getCartItems(user.uid);
    setCart(items as unknown as CartItem[]);
  };
  const removeProduct = async (productId: string): Promise<void> => {
    if (!user) return;
    await removeFromCart(user.uid, productId);
    const items = await getCartItems(user.uid);
    setCart(items as unknown as CartItem[]);
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, updateQuantity, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

