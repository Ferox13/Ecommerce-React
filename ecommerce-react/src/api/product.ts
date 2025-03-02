import { 
  db 
} from "./firebaseConfig";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
} from "firebase/firestore";
import { Product } from "../types";

// Obtener productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por id
export const getProductById = async (id: string | number): Promise<Product | null> => {
  if (!id) {
    console.error("⛔ ID del producto inválido.");
    return null;
  }

  try {
    const idStr = String(id); // Convertir explícitamente a string
    console.log("🔎 Buscando producto con ID en Firestore:", idStr);
    const productRef = doc(db, "products", idStr);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.error("❌ Producto no encontrado en Firestore.");
      return null;
    }

    console.log("✅ Producto encontrado:", productSnap.data());
    return { id: productSnap.id, ...productSnap.data() } as Product;
  } catch (error) {
    console.error("⚠️ Error al obtener producto:", error);
    return null;
  }
};

// Agregar producto
export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};

// Editar producto
export const updateProduct = async (id: string, updatedProduct: Partial<Omit<Product, "id">>): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};

// Eliminar producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw errorMessage;
  }
};
