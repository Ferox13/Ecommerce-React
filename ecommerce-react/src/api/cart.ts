import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

// Define interfaces
interface Product {
  id: string;
  [key: string]: any; // Additional product properties
}

interface CartItem extends Product {
  quantity: number;
}

// Añadir producto al carrito
export const addToCart = async (userId: string, product: Product): Promise<void> => {
  try {
    const cartItemRef = doc(db, `carts/${userId}/items`, product.id);
    await setDoc(cartItemRef, { ...product, quantity: 1 }, { merge: true });
  } catch (error: any) {
    throw error.message;
  }
};

// Obtener el carrito del usuario
export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  const querySnapshot = await getDocs(collection(db, `carts/${userId}/items`));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
};

// Actualizar cantidad de un producto
export const updateCartItem = async (userId: string, productId: string, quantity: number): Promise<void> => {
  const cartItemRef = doc(db, `carts/${userId}/items`, productId);
  await updateDoc(cartItemRef, { quantity });
};

// Eliminar producto del carrito
export const removeFromCart = async (userId: string, productId: string): Promise<void> => {
  const cartItemRef = doc(db, `carts/${userId}/items`, productId);
  await deleteDoc(cartItemRef);
};